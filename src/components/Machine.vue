<template>
    <div class="flex flex-col w-full px-4 md:flex-row justify-center gap-3 md:gap-8 mb-8 xl:gap-16 md:mb-16">
      <div>
        <div class="font-michroma text-left md:text-center mb-2 mt-6 text-sm md:text-sm xl:text-base uppercase tracking-widest text-gray-400">
          Night
        </div>

        <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
          <button
            v-for="player in getPlayersByType('night')"
            :key="player.sample.id"
            :disabled="!player.sample.ready"
            class="focus:outline-none button button-music button-blue"
            :class="{ active: player.howl.volume() == 1 }"
            @click="toggle(player.sample.id)"
          >
            <span class="material-symbols-outlined">{{ player.sample.icon }}</span>
            {{ player.sample.name }}
          </button>
        </div>
      </div>
      <div>
        <div class="font-michroma text-left md:text-center mb-2 mt-6 text-sm md:text-sm xl:text-base uppercase tracking-widest text-gray-400">
          Howls
        </div>

        <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
          <button
            v-for="player in getPlayersByType('howl')"
            :key="player.sample.id"
            :disabled="!player.sample.ready"
            class="focus:outline-none button button-music button-red"
            :class="{ active: player.howl.volume() == 1 }"
            @click="toggle(player.sample.id)"
          >
            <span class="material-symbols-outlined">{{ player.sample.icon }}</span>
            {{ player.sample.name }}
          </button>
        </div>
      </div>
      <div>
        <div class="font-michroma text-left md:text-center mb-2 mt-6 text-sm md:text-sm xl:text-base uppercase tracking-widest text-gray-400">
          Werewolf Attack
        </div>

        <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
          <button
            v-for="player in getPlayersByType('hunt')"
            :key="player.sample.id"
            :disabled="!player.sample.ready"
            class="focus:outline-none button button-music button-green"
            :class="{ active: player.howl.volume() == 1 }"
            @click="toggle(player.sample.id)"
          >
            <span class="material-symbols-outlined">{{ player.sample.icon }}</span>
            {{ player.sample.name }}
          </button>
        </div>

      </div>
      <div>
        <div class="font-michroma text-left md:text-center mb-2 mt-6 text-sm md:text-sm xl:text-base uppercase tracking-widest text-gray-400">
          Morning
        </div>

        <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
          <button
            v-for="player in getPlayersByType('morning')"
            :key="player.sample.id"
            :disabled="!player.sample.ready"
            class="focus:outline-none button button-music button-yellow"
            :class="{ active: player.howl.volume() == 1 }"
            @click="toggle(player.sample.id)"
          >
            <span class="material-symbols-outlined">{{ player.sample.icon }}</span>
            {{ player.sample.name }}
          </button>
        </div>
      </div>

      <div>
        <div class="font-michroma text-left md:text-center mb-2 mt-6 text-sm md:text-sm xl:text-base uppercase tracking-widest text-gray-400">
          Misc
        </div>

        <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
          <button
            v-for="player in getPlayersByType('misc')"
            :key="player.sample.id"
            :disabled="!player.sample.ready"
            class="focus:outline-none button button-music button-purple"
            :class="{ active: player.howl.volume() == 1 }"
            @click="toggle(player.sample.id)"
          >
            <span class="material-symbols-outlined">{{ player.sample.icon }}</span>
            {{ player.sample.name }}
          </button>
        </div>
      </div>

    </div>


</template>

<script>
import { Howl } from 'howler'

export default {
  data() {
    return {
      shareVisible: false,
      shareUrl: 'https://magenta-machine.test/#1-3-8-9',
      players: [],
    }
  },

  async mounted() {
    // Audio
    await this.loadSample( 4, 'night', 'Rain', 'rainy', '/audio/night_1.mp3')
    await this.loadSample( 5, 'howl', 'Howl', 'looks_one', '/audio/howl_1.mp3')
    await this.loadSample( 6, 'hunt', 'Scent', 'heat', '/audio/hunt_1.mp3')
    await this.loadSample( 7, 'morning', 'Song', 'sunny', '/audio/morning_1.mp3')

    await this.loadSample( 8, 'night', 'Didge', 'graphic_eq', '/audio/night_2.mp3')
    await this.loadSample( 9, 'howl', 'Howl', 'looks_two', '/audio/howl_2.mp3')
    await this.loadSample(10, 'hunt', 'Growl', 'hearing', '/audio/hunt_2.mp3')
    await this.loadSample(11, 'morning', 'Birds', 'raven', '/audio/morning_2.mp3')

    await this.loadSample(12, 'night', 'Crickets', 'pest_control', '/audio/night_3.mp3')
    await this.loadSample(13, 'howl', 'Howl', 'looks_3', '/audio/howl_3.mp3')
    await this.loadSample(14, 'hunt', 'Attack', 'emergency_home', '/audio/hunt_3.mp3')
    await this.loadSample(15, 'morning', 'Piano', 'piano', '/audio/morning_3.mp3')

    await this.loadSample( 1, 'night', 'Horror', 'comedy_mask', '/audio/night_4.mp3')
    await this.loadSample( 2, 'howl', 'Howl', 'looks_4', '/audio/howl_4.mp3')
    await this.loadSample( 3, 'morning', 'Rooster', 'campaign', '/audio/morning_4.mp3')
    await this.loadSample(16, 'hunt', 'Siren', 'notifications_active', '/audio/hunt_4.mp3')

    await this.loadSample( 17, 'misc', 'Boos', 'thumb_down', '/audio/misc_1.mp3')
    await this.loadSample( 18, 'misc', 'Mob', 'groups_2', '/audio/misc_2.mp3')
    await this.loadSample( 19, 'misc', 'Shotgun', 'target', '/audio/misc_3.mp3')
    await this.loadSample( 20, 'misc', 'Laughs', 'sentiment_very_satisfied', '/audio/misc_4.mp3')


    setTimeout(this.start, 100)
  },

  methods: {
    async loadSample(id, type, name, icon, url){
      let enabledIds = []

      let hash = window.location.hash.substr(1)
      if (hash) {
        enabledIds = hash.split('-')
      }

      let howl = new Howl({
        src: [url],
        loop: true,
        volume: (enabledIds.includes(id.toString())),
        onload: () => {
          let player = this.players.find(p => p.sample.id === id)
          player.sample.ready = true
        },
      })

      this.players.push({
        howl: howl,
        sample: {
          id: id,
          name: name,
          icon: icon,
          type: type,
          url: url,
          ready: false,
        },
      })
    },

    toggle(sampleId) {
      let player = this.players.find(p => p.sample.id === sampleId)

      if (player.howl.volume() == 1) {
        player.howl.volume(0)
      } else {
        this.players
          .filter((p) => p.sample.type === player.sample.type)
          .forEach((player) => { player.howl.volume(0) })

        player.howl.volume(1)
      }

      setTimeout(() => {
        this.buildShareUrl()
      }, 100)
    },

    start() {
      let unloadedPlayer = this.players.find(p => p.howl.state() != 'loaded')
      if (unloadedPlayer) return setTimeout(this.start, 100)

      this.players.forEach((player) => { player.howl.play() })
    },

    getPlayersByType(type) {
      return this.players.filter((p) => p.sample.type == type)
    },

    buildShareUrl() {
      let shareIds = []

      this.players
        .filter((p) => p.howl.volume() == 1)
        .forEach((player) => { shareIds.push(player.sample.id) })

      this.shareUrl = window.location.href.split('#')[0] + (shareIds.length ? '#' + shareIds.join('-') : '')
      window.history.pushState({}, null, this.shareUrl)
    },
  },
}
</script>
