<template>
  <div>
    <v-content>
      <v-row class="mb-3">
        <v-spacer></v-spacer>
        <v-card width="600">
          <div v-for="message of orderedMessages" v-bind:key="message.timestamp">
            <v-row>
              <v-spacer v-if="username === message.username"></v-spacer>
              <v-card class="my-3 pa-1 mx-7" outlined>
                <p class="caption" v-if="username === message.username">You</p>
                <p class="caption" v-else>{{message.username}}</p>
                {{message.message}}
              </v-card>
            </v-row>
          </div>
        </v-card>
        <v-spacer></v-spacer>
      </v-row>
    </v-content>
    <v-bottom-navigation v-model="value" fixed app>
      <v-text-field
        v-model="message"
        :append-outer-icon="'mdi-send'"
        :prepend-icon="icon"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        type="text"
        @click:append="toggleMarker"
        @click:append-outer="sendMessage"
        @click:prepend="changeIcon"
        @click:clear="clearMessage"
        @keyup.enter.native="sendMessage"
      ></v-text-field>
    </v-bottom-navigation>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: { username: String },
  data: () => ({
    value: "recent",
    show: false,
    message: "Hey!",
    messages: [],
    marker: true,
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue"
    ]
  }),

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
    orderedMessages() {
      let tmpMessages = Object.assign([], this.messages);
      if (tmpMessages.length === 0) {
        return [];
      }
      return tmpMessages.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
    }
  },
  async mounted() {
    await this.init();
  },

  methods: {
    async init() {
      try {
        this.messages = (
          await axios.get("http://localhost:3000", {
            headers: {
              "Content-Type": "application/json"
            }
          })
        ).data;
        this.$vuetify.goTo(document.body.scrollHeight);

        console.log(this.messages);
      } catch (err) {
        console.log(err);
      }
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    async sendMessage() {
      this.resetIcon();
      await axios.post(
        "http://localhost:3000",
        {
          username: localStorage.getItem("username"),
          message: this.message
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      this.init();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    }
  }
};
</script>
<style scoped>
</style>
