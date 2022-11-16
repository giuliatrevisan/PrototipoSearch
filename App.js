import * as React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, Alert, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer, TabRouter, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import Skeleton from './src/components/Skeleton';

function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [login, setlogin] = useState("");

  function navigateProfile() {
    navigation.push('Profile', {
      login: login
    });
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.gitBox}>
        <Ionicons name="ios-logo-github" size={200} color="white" />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={varlogin => setlogin(varlogin)}
              value={login}
              placeholder="Digite o id"
            />

            <TouchableOpacity
              style={[styles.button, styles.buttonNext]}
              onPress={navigateProfile}
            >
              <Text >Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name='back' size={24} color='white'></AntDesign>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={{ top: 50, margin: 10 }}>Clique na lupa e escreva o nome do usuário (id)</Text>
      <Text style={{ top: 50 }}>do Github que você deseja consultar</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <View>
          <Feather name="search" size={34} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

function Profile({ navigation }) {
  const route = useRoute()
  const login = route.params.login

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer = setInterval(() => {
      setLoading(false);
    }, 3000)
  }, [])

  const [nameOfUser, setnameOfUser] = useState(null)
  const [nameLogin, setnameOfLogin] = useState(null)
  const [picProfile, setpicProfile] = useState(null)
  const [followers, setfollowers] = useState(null)
  const [bio, setbio] = useState(null)
  const [orgs, setOrgs] = useState(null)
  const [repository, setRepository] = useState(null)

  function navigateBio() {
    navigation.push('Bio', {
      bio: bio
    });
  };

  function navigateFollowers() {
    navigation.push('Followers',
      {
        login: login
      })
  };

  function Reset() {
    navigation.push('Home', {
      name: null
    });
  };

  function navigateRepository() {
    navigation.push('Repository',
      {
        login: login
      })
  };

  function navigateOrgs() {
    navigation.push('Orgs',
      {
        login: login
      })
  };

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then((data) => setnameOfLogin(data.login))
      .catch((_error) => console.log("error"))
  }, []

  );

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then((data) => setnameOfUser(data.name))
      .catch((_error) => console.log("error"))
  }, []

  );

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then((data) => setpicProfile(data.avatar_url))
      .catch((_error) => console.log("error"))
  }, []
  );

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then((data) => setbio(data.bio))
      .catch((_error) => console.log("error"))
  }, [])

  if (login == false) {
    return (
      <Modal animationType="fade">
        <View style={styles.userInvalidModal}>
          <View style={styles.modalUserStyle}>
            <Text style={styles.errorText}>Erro!</Text>
            <Text style={styles.userInvalidText}>Usuário Inválido</Text>
            <TouchableOpacity style={styles.okButtonModal}
              onPress={Reset}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
//teste
  
  if (bio == null) {
    return (
      <View style={styles.containerBio}>
        <View style={styles.boxViewBio}>
          <View style={styles.bioView}>
            <Text style={{ color: 'white', fontSize: 20, top: -10, fontWeight: 'bold' }}>Biografia</Text>
          </View>
          <Text style={{ margin: 10 }}>"Este usuário não tem biografia!"</Text>
        </View>
      </View>
    );
  }

  return (
    <Skeleton visible={loading}>
      <View style={styles.NavigationContainer}>
        <Image style={styles.picture} source={{ uri: picProfile }}></Image>
        <TouchableOpacity style={styles.searchBox}>
          <Feather name="search" size={34} color="black" />
        </TouchableOpacity>
        <Text style={styles.nameUser}>{nameOfUser}</Text>
        <Text style={styles.userName}>@{nameLogin}</Text>
        <View style={styles.boxButtons}>
          <TouchableOpacity style={styles.boxBio}
            onPress={navigateBio}
          >
            <View style={styles.boxIcon}>
              <Ionicons name="ios-people-outline" size={34} color="black" />
            </View>
            <View style={styles.boxIconRight}>
              <AntDesign name="right" size={25} color="Black" />
            </View>
            <View styles={styles.boxTextBio}>
              <Text style={styles.boldBio}>Bio</Text>
              <Text style={styles.textBio}>Um pouco sobre o usuário</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxOrg}
            onPress={navigateOrgs}
          >
            <View style={styles.boxIcon}>
              <AntDesign name="customerservice" size={34} color="black" />
            </View>
            <View style={styles.boxIconRight}>
              <AntDesign name="right" size={25} color="Black" />
            </View>
            <View styles={styles.boxTextOrgs}>
              <Text style={styles.boldOrgs}>Orgs</Text>
              <Text style={styles.textOrgs}>Organizações que o usuário faz parte</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxRepository}
            onPress={navigateRepository}
          >
            <View style={styles.boxIcon}>
              <AntDesign name="filetext1" size={34} color="black" />
            </View>
            <View style={styles.boxIconRight}>
              <AntDesign name="right" size={25} color="Black" />
            </View>
            <View styles={styles.boxTextRepository}>
              <Text style={styles.boldRepository}>Repositórios</Text>
              <Text style={styles.textRepository}>Lista contendo todos os repositórios</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxFollowers}
            onPress={navigateFollowers}
          >
            <View style={styles.boxIcon}>
              <Ionicons name="scan" size={34} color="black" />
            </View>
            <View style={styles.boxIconRight}>
              <AntDesign name="right" size={25} color="Black" />
            </View>
            <View styles={styles.boxTextFollowers}>
              <Text style={styles.boldFollowers}>Seguidores</Text>
              <Text style={styles.textFollowers}>Lista de seguidores</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.boxReset} onPress={Reset}>
          <View style={styles.iconReset}>
            <Ionicons name="exit-outline" size={34} color="black"></Ionicons>
          </View>
          <Text style={styles.textReset}>Resetar</Text>
        </TouchableOpacity>
      </View>
    </Skeleton>
  )
};

function BioScreen() {
  const route = useRoute()
  const bio = route.params.bio


  return (
    <View style={styles.containerBio}>
      <View style={styles.boxViewBio}>
        <View style={styles.bioView}>
          <Text style={{ color: 'white', fontSize: 20, top: -10, fontWeight: 'bold' }}>Biografia</Text>
        </View>
        <Text style={{ margin: 10 }}>{bio}</Text>
      </View>
    </View>
  )

};

function OrgScreen(navigation) {
  const route = useRoute()
  const login = route.params.login
  const [orgs, setOrgs] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}/orgs`)
      .then((response) => response.json())
      .then((data) => setOrgs(data))
      .catch((error) => console.log("error"))
  })
  if (orgs == "") {
    return (
      <View style={styles.containerBio}>
        <View style={styles.boxViewBio}>
          <View style={styles.bioView}>
            <Text style={{ color: 'white', fontSize: 20, top: -10, fontWeight: 'bold' }}>Orgs</Text>
          </View>
          <Text style={{ margin: 10 }}>Este usuário não tem nenhuma organização interligada ao perfil</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.containerFollowers}>
      <FlatList
        data={orgs}
        renderItem={({ item }) => {
          return (
            <View style={styles.boxFlatList}>
              <Text>{item.login}</Text>
            </View>
          )
        }
        }>

      </FlatList>
    </View>

  )
}

function RepositoryScreen(navigation) {
  const route = useRoute()
  const login = route.params.login
  const [repository, setRepository] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}/repos`)
      .then((response) => response.json())
      .then((data) => setRepository(data))
      .catch((error) => console.log("error"))
  })
  if (repository == "") {
    return (
      <View style={styles.containerBio}>
        <View style={styles.boxViewBio}>
          <View style={styles.bioView}>
            <Text style={{ color: 'white', fontSize: 20, top: -10, fontWeight: 'bold' }}>Orgs</Text>
          </View>
          <Text style={{ margin: 10 }}>Este usuário não tem nenhuma organização interligada ao perfil</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.containerFollowers}>
      <FlatList
        data={repository}
        renderItem={({ item }) => {
          return (
            <View style={styles.boxFlatList}>
              <Text style={styles.textFollow}>{item.name}</Text>
            </View>
          )
        }
        }
      >
      </FlatList>
    </View>

  );
}

function FollowersScreen() {
  const route = useRoute()
  const login = route.params.login
  const [followers, setfollowers] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}/followers`)
      .then((response) => response.json())
      .then((data) => setfollowers(data))
      .catch((error) => console.log("error"))
  })

  if (followers == "") {
    return (
      <View style={styles.containerBio}>
        <View style={styles.boxViewBio}>
          <View style={styles.bioView}>
            <Text style={{ color: 'white', fontSize: 20, top: -10, fontWeight: 'bold' }}>Orgs</Text>
          </View>
          <Text style={{ margin: 10 }}>Este usuário não tem nenhuma organização interligada ao perfil</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.containerFollowers}>
      <FlatList
        data={followers}
        renderItem={({ item }) => {
          return (
            <View style={styles.boxFlatList}>
              <Text style={styles.textFollow}>{item.login}</Text>
            </View>
          )
        }
        }
      >
      </FlatList>
    </View>

  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Bio" component={BioScreen} />
        <Stack.Screen name="Orgs" component={OrgScreen} />
        <Stack.Screen name="Repository" component={RepositoryScreen} />
        <Stack.Screen name="Followers" component={FollowersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  /////////////////////////////   HOME   ////////////////////////////////////////////

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    alignContent: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    height: 402,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  },
  button: {
    borderRadius: 40,
    padding: 10,
    elevation: 2,
    margin: 4,
  },
  buttonOpen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    left: 100,
    top: -105,
    borderRadius: 15,
    width: 70,
    height: 70
  },
  buttonNext: {
    backgroundColor: "808080",
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    padding: 4,
    top: 230,

  },

  buttonClose: {
    backgroundColor: "black",
    width: 50,
    alignItems: 'center',
    width: "100%",
    marginTop: 250,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  gitBox: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
  },
  input: {
    top: 100,
    backgroundColor: "white",
    justifyContent: "flex-start",
    fontSize: 20
  },

  userInvalidModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalUserStyle: {
    width: 300,
    height: 180,
    margin: 20,
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
  },

  userInvalidText: {
    fontSize: 20,
  },

  okButtonModal: {
    height: 30,
    width: 200,
    backgroundColor: 'black',
    borderRadius: 10, justifyContent: 'center',
    alignItems: 'center',
    top: 40,
  },

  okButtonText: {
    color: 'white',
    fontSize: 16,
  },

  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  ///////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////   PROFILE  ///////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  NavigationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  picture: {
    height: 190,
    width: 190,
    backgroundColor: '#808080',
    borderRadius: 50,
    top: -20
  },

  searchBox: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    top: -60,
    left: 70
  },

  nameUser: {
    top: -50,
    fontWeight: 'bold',
    fontSize: 20
  },

  userName: {
    top: -50,

  },

  boxButtons: {
    backgroundColor: "white",
    height: 350,
    width: "80%",
    top: -30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f1f1f1',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  boxBio: {
    flexGrow: 0.25,
    backgroundColor: 'white',
    width: "100%",
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center'

  },

  boxOrg: {
    flexGrow: 0.25,
    backgroundColor: 'white',
    width: "100%",
    height: 50,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 2,
    alignItems: 'center'

  },

  boxRepository: {
    flexGrow: 0.25,
    backgroundColor: 'white',
    width: "100%",
    height: 50,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 2,
    alignItems: 'center'

  },

  boxFollowers: {
    flexGrow: 0.25,
    backgroundColor: 'white',
    width: "100%",
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    borderTopColor: '#f1f1f1',
    borderTopWidth: 2,
  },

  boxReset: {
    flex: 0.3,
    backgroundColor: "white",
    height: 60,
    width: "80%",
    borderRadius: 20,
    borderLeftColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  boxIcon: {
    right: 120,
    top: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f1f1f1',
    width: 45,
    height: 45,
    justifyContent: 'center',

  },
  iconReset: {
    right: 60,
    top: 15
  },

  textReset: {
    top: -20,
    fontSize: 20
  },

  boxTextFollowers: {
    justifyContent: 'center'
  },

  boldBio: {
    fontWeight: 'bold',
    top: -50
  },

  boldOrgs: {
    fontWeight: 'bold',
    right: -23,
    top: -50
  },
  boldRepository: {
    fontWeight: 'bold',
    top: -50,
    right: -20,
  },

  boldFollowers: {
    fontWeight: 'bold',
    top: -50,
    right: 20
  },


  textBio: {
    color: '#aeaeae',
    top: -40,
    fontSize: 10
  },

  textOrgs: {
    fontSize: 10,
    top: -40,
    right: -20,
    color: '#aeaeae',
  },

  textRepository: {
    fontSize: 10,
    color: '#aeaeae',
    top: -40,
    right: -20
  },

  textFollowers: {
    fontSize: 10,
    color: '#aeaeae',
    top: -40,
    right: 20
  },

  boxIconRight: {
    left: 140,
    top: -10
  },

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////    Bio    /////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  containerBio: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  boxViewBio: {
    width: 390,
    height: 390,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  bioView: {
    backgroundColor: 'black',
    height: 70,
    width: 390,
    borderTopWidth: 20,
    top: -160,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },


  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////  Followers  ////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  containerFollowers: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  boxFlatList: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: "100%",
    height: 50,
    alignItems: 'center',
    borderColor: '#f1f1f1',
    borderBottomWidth: 1,
  },

  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },

  textFollow: {
    fontSize: 20,
    color: 'black'
  },

});


export default App;