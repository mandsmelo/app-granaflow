
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const categorias = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Saúde',
  'Compras',
  'Outros',
];

export default function FormScreen({
  navigation,
  adicionarGasto,
}) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('Outros');
  const [erro, setErro] = useState('');

  function salvar() {
    const descricaoLimpa = descricao.trim();
    const valorNumerico = Number(valor.replace(',', '.'));

    if (!descricaoLimpa) {
      setErro('Digite a descrição do gasto!');
      return;
    }

    if (
      valor.trim() === '' ||
      !Number.isFinite(valorNumerico) ||
      valorNumerico <= 0
    ) {
      setErro('Digite um valor válido maior que zero!');
      return;
    }

    adicionarGasto(descricaoLimpa, valorNumerico, categoria);

    setDescricao('');
    setValor('');
    setCategoria('Outros');
    setErro('');

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo gasto</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço"
        value={descricao}
        onChangeText={(texto) => {
          setDescricao(texto);
          setErro('');
        }}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 25,00"
        value={valor}
        onChangeText={(texto) => {
          setValor(texto);
          setErro('');
        }}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Categoria</Text>

      <View style={styles.categorias}>
        {categorias.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoria,
              categoria === item && styles.categoriaSelecionada,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoCategoriaSelecionada,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {erro !== '' && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
      >
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 20,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoria: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 13,
  },
  categoriaSelecionada: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  textoCategoria: {
    color: '#334155',
    fontWeight: '500',
  },
  textoCategoriaSelecionada: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  erro: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
