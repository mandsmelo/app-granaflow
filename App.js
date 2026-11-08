
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';

const Stack = createNativeStackNavigator();
const STORAGE_KEY = '@granaflow:gastos';

export default function App() {
  const [gastos, setGastos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Carregar os gastos salvos quando abrir o aplicativo
  useEffect(() => {
    async function carregarGastos() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);

        if (dados !== null) {
          setGastos(JSON.parse(dados));
        }
      } catch (error) {
        console.log('Erro ao carregar gastos:', error);
      } finally {
        setCarregado(true);
      }
    }

    carregarGastos();
  }, []);

  // Salvar sempre que a lista de gastos mudar
  useEffect(() => {
    async function salvarGastos() {
      if (!carregado) return;

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(gastos)
        );
      } catch (error) {
        console.log('Erro ao salvar gastos:', error);
      }
    }

    salvarGastos();
  }, [gastos, carregado]);

  // Adicionar um novo gasto
  function adicionarGasto(descricao, valor, categoria) {
    const novoGasto = {
      id: Date.now().toString(),
      descricao,
      valor,
      categoria,
    };

    setGastos((listaAtual) => [...listaAtual, novoGasto]);
  }

  // Excluir um gasto
  function excluirGasto(id) {
    setGastos((listaAtual) =>
      listaAtual.filter((gasto) => gasto.id !== id)
    );
  }

  // Limpar todos os gastos
  function limparGastos() {
    setGastos([]);
  }

  if (!carregado) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#172554' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" options={{ title: 'GranaFlow' }}>
          {(props) => (
            <HomeScreen
              {...props}
              gastos={gastos}
              excluirGasto={excluirGasto}
              limparGastos={limparGastos}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Form"
          options={{ title: 'Novo gasto' }}
        >
          {(props) => (
            <FormScreen
              {...props}
              adicionarGasto={adicionarGasto}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
