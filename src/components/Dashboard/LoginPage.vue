<template>
  <v-parallax src="../../assets/300.jpg" width="95vw" height="85vh"
    style="margin: 2%; border: 1px solid #333; border-radius: 8px;">
    <v-sheet color="transparent" rounded width="90vw" height="75h"
      style="margin: 2%; border: 1px solid teal; border-radius: 8px;">

      <v-card class="mx-auto justify-center align-center" color="transparent" theme="light" width="80%" height="65vh"
        style="margin: 2%" prepend-icon="mdi-rhombus-outline" title="Commodities Sales & Price Visualizations">
        <v-form v-model="loaded" @submit.prevent="onSubmit" class="form">

          <v-text-field v-model="form.email" :readonly="loading" class="loginEmail" clearable label="Email"
            color="black" bg-color="teal" required></v-text-field>

          <v-text-field v-model="form.password" :readonly="loading" clearable label="Password" bg-color="blue"
            :type="showPassword ? 'text' : 'password'" class="loginEmail" @click:clear="clearPassword">
            <template #append>
              <v-icon @click="togglePasswordVisibility" class="icon-right">{{
                showPassword ? "mdi-eye-off" : "mdi-eye"
              }}</v-icon>
            </template>
          </v-text-field>
          <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" variant="flat"
            width="500" height="50">
            Sign In
          </v-btn>

          <p>
            {{ tradeMark }} |
            {{
              new Date().toLocaleDateString("en-ZM", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </p>

        </v-form>
      </v-card>
    </v-sheet>
  </v-parallax>
</template>

<script setup lang="ts">

import { onBeforeMount, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/AppsAuth";

const showPassword = ref(false);
const storeAUT = useAuthStore();
const router = useRouter();
const loading = ref(false);
const loaded = ref(false);

const tradeMark = ref("Trading Houses Data Ltd (v 2.0.1.)");
const form = ref({
  email: "",
  password: "",
});

const onSubmit = async () => {
  if (!form.value.email || !form.value.password) return;
  loading.value = true;
  const isAuthenticated = form.value.email;
  const x = await storeAUT.isAuthorizedMgmt(isAuthenticated);
  try {
    if (x) { router.push({ name: "Commodities" }); }
    else {
      alert(" Wrong password | maybe Use guests password | test1@gmail.com")
    }
  } catch (error) {
    if (error) {
      alert(error);
      console.log("the is error ", error);
    }
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
const clearPassword = () => {
  form.value.password = "";
};
onBeforeMount(async () => {
  storeAUT.isAuthoririsedRevoked();
  watchEffect(() => {
    console.log("5. Watched Login-Value changes:", storeAUT.user);
  });
});
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  min-height: 80vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;


  .loginEmail,
  .login {
    font-family: 'Arial', sans-serif;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 2px;
    margin: 2px;
    margin-bottom: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: 1px solid #ddd;
  }

  .loginEmail {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 90px;
    background-color: #f5f5f5;
    margin: 10px 10px;
    padding: 2px;
  }

  input[type="color"] {
    width: 30px;
    height: 30px;
    margin: 0;
    border: none;
    padding: 0;
    background: transparent;
  }

  p {
    text-align: center;
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    margin: 20px 0;
  }

  .icon-right {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

h1 {
  font-family: 'Proza Libre', sans-serif;
  color: #333;
  font-weight: 300;
  background: #e0f7fa;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.router-link-exact-active {
  color: #f44336;
}

.form {
  background-color: transparent;
  max-width: 100%;
  height: 75%;
  margin: 2%;
  padding: 2px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
