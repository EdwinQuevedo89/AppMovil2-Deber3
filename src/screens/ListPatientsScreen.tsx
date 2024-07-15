import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore'; // Importa las funciones necesarias para interactuar con Firestore
import { database } from '../config/firebaseConfig'; // Ajusta la ruta según tu configuración

interface Patient {
  id: string;
  name: string;
  species: string;
  owner: string;
  // Agrega más campos según sea necesario
}

const ListPatientsScreen: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'patients')); // Ajusta la referencia según tu colección en Firestore
        const patientsList: Patient[] = [];
        querySnapshot.forEach((doc) => {
          const patientData = doc.data();
          patientsList.push({
            id: doc.id,
            name: patientData.name,
            species: patientData.species,
            owner: patientData.owner,
            // Agrega más campos según sea necesario
          });
        });
        setPatients(patientsList);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pacientes</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text>Nombre: {item.name}</Text>
            <Text>Especie: {item.species}</Text>
            <Text>Dueño: {item.owner}</Text>
            {/* Agrega más campos según sea necesario */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  patientItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default ListPatientsScreen;
