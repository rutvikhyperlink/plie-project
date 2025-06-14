import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../assets/images';
import { CommonActions } from '@react-navigation/native';
import { setUserToken } from '../../Global/Gconstant';

const Login = ({ navigation }: any) => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPasseword] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const _isValidate = () => {
    if (!email || email.trim() === '') {
      Alert.alert('Please enter email');
      return false;
    } else if (!emailRegex.test(email)) {
      Alert.alert('Please enter valid email');
      return false;
    } else if (!password || password.trim() === '') {
      Alert.alert('Please enter password');
      return false;
    }
    return true;
  };

  const loginUser = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(
        'http://3.7.81.243/projects/plie-api/public/api/login',
        {
          method: 'POST',
          headers: {},
          body: formData,
        },
      );

      const data = await response.json();
      console.log('Login Sucess', data?.token);


      if (data?.success == true) {
        setUserToken(data);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'BottomTab',
              },
            ],
          }),
        );
      } else if (data?.success == false) {
        Alert.alert(data?.message);
      }

      return data;
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar
      barStyle={'dark-content'}/>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.logoText}>Pliē</Text>
          <Image source={Images.imgGallery}></Image>
        </View>
        <View style={[styles.container, { marginTop: 38 }]}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            style={styles.input}
          />
        </View>

        <View style={[styles.container,{marginTop:15}]}>
          <Text style={styles.label}>Password</Text>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              alignItems: 'center',
              borderRadius: 8,
              elevation: 2, // shadow for Android
              shadowColor: '#000', // shadow for iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
            }}
          >
            <TextInput
              placeholder="Password"
              secureTextEntry={secureText}
              style={[{ flex: 1, paddingLeft: 12 }]}
              value={password}
              onChangeText={text => {
                setPasseword(text);
              }}
            />
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              style={{ marginRight: 12 }}
              hitSlop={30}
            >
              <Image
                resizeMode="contain"
                tintColor={'gray'}
                source={secureText ? Images.imgEyeHide : Images.imgEyeShow}
              />
              {/* <Ionicons name={secureText ? 'eye-off' : 'eye'} size={20} color="#888" /> */}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              if (_isValidate()) {
                loginUser();
              }
            }}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.signupText}>
              Not a member?
              <Text style={styles.linkText}> Sign Up Here</Text>
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or Sign In with:</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Icons */}
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconBox}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/color/48/google-logo.png',
                }}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios-filled/50/mac-os.png',
                }}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/color/48/facebook-new.png',
                }}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'BottomTab',
                    },
                  ],
                }),
              );
            }}
          >
            <Text style={styles.guestText}>Enter as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    height: 280,

    // paddingVertical: 50,
  },
  logoText: {
    fontSize: 70,
    fontWeight: '300',
    // marginBottom: 20,
  },
  placeholderImage: {
    // height: 60,
    // width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 45,
    // marginVertical: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 40, // space for the icon
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android
    position: 'relative',
  },

  inputPassord: {
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: '#888',
    fontSize: 14,
  },
  signInButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
    backgroundColor: '#00C896',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 27,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupText: {
    textAlign: 'right',
    marginTop: 15,
    fontWeight: '400',
    fontSize: 12,
  },
  linkText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 65,
    marginBottom: 40,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#777',
  },

  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  iconBox: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android
  },
  iconImage: {
    height: 30,
    width: 30,
  },
  guestText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#aaa',

    marginTop: 55,
  },
});
