<template>
  <v-parallax
    src="../../assets/200.jpg"
    width="95%"
    height="950px"
    style="margin: 2%"
  >
    <v-sheet
      color="transparent"
      rounded
      width="90%"
      height="850px"
      style="margin: 2%"
    >
      <v-card
        class="mx-auto justify-center align-center"
        color="transparent"
        theme="light"
        width="80%"
        height="800"
        style="margin: 2%"
        prepend-icon="mdi-rhombus-outline"
        title="Medical Benefits Office"
      >
        <v-form
          v-model="loaded"
          @submit.prevent="onSubmit"
          style="
            text-align: center;
            background-color: transparent;
            max-width: 100%;
            height: 75%;
            margin: 2%;
            padding: 2px;
          "
        >
          <br />
          <v-text-field
            v-model="form.email"
            :readonly="loading"
            class="loginEmail"
            clearable
            label="Email"
            color="black"
            bg-color="teal"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :readonly="loading"
            clearable
            label="Password"
            bg-color="blue"
            :type="showPassword ? 'text' : 'password'"
            class="loginEmail"
            @click:clear="clearPassword"
          >
            <template #append>
              <v-icon @click="togglePasswordVisibility" class="icon-right">{{
                showPassword ? "mdi-eye-off" : "mdi-eye"
              }}</v-icon>
            </template>
          </v-text-field>
          <br />

          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="flat"
            width="300"
            height="50"
          >
            Sign In
          </v-btn>
          <br />
          <br />

          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="flat"
            width="300"
            height="50"
          >
            <router-link to="/Registration" class="text-decoration-none">
              <span> Create Account? </span>
            </router-link></v-btn
          >
          <br />
          <br />

          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="flat"
            width="300"
            height="50"
          >
            <router-link to="/Registration" class="text-decoration-none">
              <span> Forgot Password? </span>
            </router-link></v-btn
          >
          <br />
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
          <br />
        </v-form>
      </v-card>
    </v-sheet>
  </v-parallax>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { useRouter } from "vue-router";
import { useEmployeeStore } from "../../stores/DataEmployees";
import { useAuthStore } from "../../stores/AppsAuth";

const router = useRouter();

const loading = ref(false);
const loaded = ref(false);
const showPassword = ref(false);
const storeAPI = useEmployeeStore();
const storeAUT = useAuthStore();
const tradeMark = ref("Health Guards (Z) Ltd (v 4.0.0.)");

const form = ref({
  email: "",
  password: "",
});

onBeforeMount(async () => {
  await storeAPI.fetchSalaries(); 
});

const onSubmit = async () => {
  if (!form.value.email || !form.value.password) return;
  loading.value = true;
  const isAuthenticated = form.value.email;
  localStorage.setItem("ActiveUserEmail", JSON.stringify(isAuthenticated));
  const x= await storeAUT.isAuthorized(isAuthenticated);
  console.log(x);
  console.log(isAuthenticated);

  try {
  if(x)
   { router.push({ name: "Employees" });}
   else{
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


</script>

<style lang="scss" scoped>
#app {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;

  input {
    padding: 1rem 1rem;
    font-size: 1.5rem;
    border: 0;
    border-radius: 3px;
  }
}

h1 {
  font-family: "Proza Libre", sans-serif;
  color: black;
  font-weight: 300;
  background: greenyellow;
}

input[type="color"] {
  width: 20px;
  height: 10px;
  margin: 0px;
  border: 1px solid black;
  padding: 0px !important;
  background: red;
}

.loginEmail {
  font-family: arial;
  font-size: 18px;
  color: black;
  border: 1px solid black;
  padding: 7px;
  display: inline-block;
  width: 90%;
  height: 70px;
}

.login {
  font-family: arial;
  font-size: 18px;
  color: black;
  border: 1px solid black;
  padding: 7px;
  display: inline-block;
  width: 30%;
  background: greenyellow;
}

p {
  text-align: center;
  line-height: 100px;
  font-family: arial;
  font-size: 18px;
}

.router-link-exact-active {
  color: red;
}

.icon-right {
  display: flex;
  align-items: center;
  display: flex;
  margin-left: auto;
}
</style>
