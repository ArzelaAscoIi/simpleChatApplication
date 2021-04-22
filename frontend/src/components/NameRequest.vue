<template>
  <v-card max-width="400">
    <v-card-title>Enter your username</v-card-title>
    <v-card-text>
      <v-text-field v-model="username"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mr-3 mb-1" @click="storeUser" color="primary">Set Username</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    username: null
  }),
  methods: {
    storeUser() {
      localStorage.setItem("username", this.username);
      this.$emit("user-set");
    }
  }
};
</script>
