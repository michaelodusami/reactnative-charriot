import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? '#007AFF' : undefined}
        />
        <Text style={styles.label}>I agree to the Terms and Conditions</Text>
      </View>
      <Pressable 
        style={styles.button} 
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgb(217, 217, 214)'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;