import React, { useEffect, useState } from "react";
import { View,Text,Image,StyleSheet, ScrollView, SafeAreaView, TextInput } from "react-native";

import api from './src/services/api'
import {globalStyles} from './src/styles/globalStyles'

export default function App(){
  const [filmes,setFilmes] = useState([])
  const [pesquisa,setPesquisa] = useState('')
  
  useEffect(()=>{
    async function carregar(){
      if(pesquisa.trim() !== ''){
        try{
          const response = await api.get(pesquisa.replace('', '%20'))
          setFilmes(response.data)
        }catch(e){
          console.error('Deu erro!',error)
        }
      }else{
        setFilmes([])
      }
    }
    carregar()
  },[pesquisa])

  const handlePesquisa = (texto)=>{
    setPesquisa(texto)
  }

  return(
    <SafeAreaView style={globalStyles.container}>
      <TextInput style={globalStyles.input} placeholder="pode buscar ae" value={pesquisa} onChangeText={handlePesquisa}/>
      <Text style={globalStyles.titulo}>Lista de Filmes</Text>
      <ScrollView contentContainerStyle={globalStyles.lista}>
      {filmes.map(filme=>(
        <View key={filme.show.id} style={globalStyles.card}>
          {filme.show.image && (
            <Image source={{uri: filme.show.image.medium}} style={globalStyles.imagem} resizeMode="cover"/>
          )}
          <View style={globalStyles.infoContainer}>
            <Text style={globalStyles.tituloFilme} numberOfLines={1}>{filme.show.name}</Text>
            <Text style={globalStyles.tituloFilme} numberOfLines={2}>{filme.show.url}</Text>
          </View>
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  )
  
}