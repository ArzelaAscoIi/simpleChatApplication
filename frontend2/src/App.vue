<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
      {{username}}
      <v-btn class="mx-3" @click="reset()" depressed small>log out</v-btn>
    </v-app-bar>

    <chat :username="username" />

    <v-dialog v-model="showNameRequest" max-width="400">
      <NameRequest @user-set="init" />
    </v-dialog>
  </v-app>
</template>

<script>
import chat from "./components/chat";
import NameRequest from "./components/NameRequest";

export default {
  name: "App",

  components: {
    chat,
    NameRequest
  },

  data: () => ({
    username: null,
    showNameRequest: false
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.username = localStorage.getItem("username");

      if (!this.username) {
        this.showNameRequest = true;
      } else {
        this.showNameRequest = false;
      }
    },
    reset() {
      localStorage.clear();
      this.init();
    }
  }
};
</script>
