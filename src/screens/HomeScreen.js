
import React, { useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({
  navigation,
  gastos,
  excluirGasto,
  limparGastos,
}) {
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  // Calcular o total dos gastos
  const total = gastos.reduce(
    (soma, gasto) => soma + gasto.valor,
    0
  );

  // Formatar valores em reais
  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <View style={styles.container}>

      {/* Total acumulado */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          Total gasto
        </Text>

        <Text style={styles.totalValor}>
          {formatarMoeda(total)}
        </Text>
      </View>

      {/* Botão adicionar */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.textoBotao}>
          + Adicionar gasto
        </Text>
      </TouchableOpacity>

      {/* Cabeçalho da lista */}
      <View style={styles.cabecalhoLista}>
        <Text style={styles.titulo}>
          Meus gastos
        </Text>

        {gastos.length > 0 && (
          <TouchableOpacity
            style={styles.botaoLimpar}
            onPress={() => setMostrarConfirmacao(true)}
          >
            <Text style={styles.textoLimpar}>
              Limpar tudo
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Confirmação para limpar */}
      {mostrarConfirmacao && (
        <View style={styles.confirmacao}>
          <Text style={styles.tituloConfirmacao}>
            Tem certeza?
          </Text>

          <Text style={styles.mensagemConfirmacao}>
            Todos os seus gastos serão excluídos permanentemente.
          </Text>

          <View style={styles.acoesConfirmacao}>
            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => setMostrarConfirmacao(false)}
            >
              <Text style={styles.textoCancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoConfirmar}
              onPress={() => {
                limparGastos();
                setMostrarConfirmacao(false);
              }}
            >
              <Text style={styles.textoConfirmar}>
                Sim, excluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Lista de gastos */}
      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}

        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum gasto cadastrado ainda.
          </Text>
        }

        renderItem={({ item }) => {
          const gastoAlto = item.valor > 100;

          return (
            <View
              style={[
                styles.item,
                gastoAlto && styles.itemAlto,
              ]}
            >
              <View style={styles.dadosGasto}>
                <Text style={styles.descricao}>
                  {item.descricao}
                </Text>

                <Text style={styles.categoria}>
                  {item.categoria || 'Outros'}
                </Text>

                <Text
                  style={[
                    styles.valor,
                    gastoAlto && styles.valorAlto,
                  ]}
                >
                  {formatarMoeda(item.valor)}
                </Text>

                {gastoAlto && (
                  <Text style={styles.aviso}>
                    Gasto acima de R$ 100!
                  </Text>
                )}
              </View>

              {/* Excluir individualmente */}
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluirGasto(item.id)}
              >
                <Text style={styles.textoExcluir}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 20,
  },

  totalCard: {
    backgroundColor: '#172554',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
  },

  totalLabel: {
    color: '#BFDBFE',
    fontSize: 16,
  },

  totalValor: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
  },

  botaoAdicionar: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cabecalhoLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#172554',
  },

  botaoLimpar: {
    backgroundColor: '#FEE2E2',
    padding: 9,
    borderRadius: 8,
  },

  textoLimpar: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 12,
  },

  confirmacao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
  },

  tituloConfirmacao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 8,
  },

  mensagemConfirmacao: {
    color: '#475569',
    fontSize: 14,
    marginBottom: 18,
  },

  acoesConfirmacao: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  botaoCancelar: {
    backgroundColor: '#E2E8F0',
    padding: 12,
    borderRadius: 8,
  },

  textoCancelar: {
    color: '#334155',
    fontWeight: 'bold',
  },

  botaoConfirmar: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 8,
  },

  textoConfirmar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemAlto: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },

  dadosGasto: {
    flex: 1,
  },

  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  categoria: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },

  valor: {
    color: '#16A34A',
    fontSize: 15,
    marginTop: 5,
  },

  valorAlto: {
    color: '#B45309',
    fontWeight: 'bold',
  },

  aviso: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },

  botaoExcluir: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  textoExcluir: {
    color: '#DC2626',
    fontWeight: 'bold',
  },

  vazio: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
});
