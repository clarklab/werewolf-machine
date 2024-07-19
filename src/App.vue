<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <div class="">
      <img src="/images/werewolf-logo.svg" alt="MAGENTA" class="mx-auto h-10 md:h-16 xl:h-20" />
    </div>
    <Machine />
    <div class="mt-8 md:mt-16">
      <div class="h-12 md:h-16 xl:h-20" />
    </div>
  </div>

  <div class="fixed z-10 inset-0 overflow-y-auto font-michroma" :class="{ 'hidden': !shareModal }">
    <div class="min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-radial-gradient opacity-75" />
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;

      <div class="inline-block bg-radial-gradient text-white text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
        <div class="p-4">
          <div class="mb-2">Share this link with your friends :</div>
          <input v-model="shareUrl" type="text" class="block form-control mx-auto focus:outline-none px-3 py-2 font-michroma w-full" readonly />
        </div>

        <div class="p-4">
          <button class="focus:outline-none button button-red py-2 font-michroma uppercase block mb-2" style="width: 100%; height: auto; line-height: initial;" @click="copyToClipboard(shareUrl)">
            <span v-if="copied"><i class="fas fa-check" /> Copied</span>
            <span v-else>Copy to clipboard</span>
          </button>
          <button class="focus:outline-none button button-red py-2 font-michroma uppercase block" style="width: 100%; height: auto; line-height: initial;" @click="shareModal = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Machine from './components/Machine.vue'

export default {
  components: {
    Machine,
  },

  data() {
    return {
      magentaLinksModal: false,
      shareModal: false,
      shareUrl: '',
      copied: false,
    }
  },

  computed: {
    version() {
      return 'v' + __APP_VERSION__
    },
  },

  watch: {
    shareModal(value) {
      if (value) {
        this.shareUrl = window.location.href
      }
    },
  },

  methods: {
    copyToClipboard(text) {
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      input.select()
      input.setSelectionRange(0, 99999) // For mobile devices
      navigator.clipboard.writeText(text)
      document.body.removeChild(input)

      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2000)
    },
  },
}
</script>
