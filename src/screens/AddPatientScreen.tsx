import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../config/firebaseConfig'; // Asegúrate de ajustar la ruta según tu configuración
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

const AddPatientScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [owner, setOwner] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleSavePatient = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para agregar un paciente.');
      return;
    }

    const newPatient = {
      name,
      species,
      owner,
      // Agrega más campos aquí según sea necesario
    };

    try {
      // Agrega el nuevo paciente a la colección 'patients' en Firestore
      await addDoc(collection(database, 'patients'), newPatient);
      Alert.alert('Éxito', 'Paciente agregado exitosamente');
      // Limpia los campos del formulario
      setName('');
      setSpecies('');
      setOwner('');
      // Agrega más limpieza de campos si es necesario
    } catch (error) {
      console.error('Error al guardar paciente:', error);
      Alert.alert('Error', 'Hubo un error al guardar el paciente. Por favor, intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Especie"
        value={species}
        onChangeText={text => setSpecies(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dueño"
        value={owner}
        onChangeText={text => setOwner(text)}
      />
      {/* Agrega más campos del formulario aquí según sea necesario */}
      <Button title="Guardar paciente" onPress={handleSavePatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default AddPatientScreen;
