<template>
  <v-row>
    <v-col class="banner pa-0" cols="12">
      <v-card color="#385F73" dark>
        <v-img
          :src="pageImg"
          class="white--text align-end pb-4"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
        >
          <div>
            <v-card-title class="text-h5">Welcome to APREX</v-card-title>
            <v-card-subtitle>Let’s get started with NFT</v-card-subtitle>
            <div>
              <v-btn outlined class="ma-2" @click="$vuetify.goTo($refs.part1)">
                What is the APREX
                <v-icon right dark>mdi-arrow-right-thin</v-icon>
              </v-btn>
              <v-btn outlined class="ma-2" @click="$vuetify.goTo($refs.part2)">
                What is the feature
                <v-icon right dark>mdi-arrow-right-thin</v-icon>
              </v-btn>
              <v-btn outlined class="ma-2" @click="$vuetify.goTo($refs.part3)">
                How to APREX
                <v-icon right dark>mdi-arrow-right-thin</v-icon>
              </v-btn>
            </div>
          </div>
        </v-img>
      </v-card>
    </v-col>

    <v-col class="part1 pa-0" cols="12">
      <div ref="part1" class="pa-4">
        <div class="text-h3">Part 1</div>
        <div class="text-h4">What is the APREX</div>
        <div class="text-h5">{{ $t('guide.aprex_title') }}</div>
      </div>

      <div class="pa-4">
        <p class="text-subtitle-1">{{ $t('guide.aprex_con1') }}</p>
        <p class="text-subtitle-1">{{ $t('guide.aprex_con2') }}</p>
        <p class="text-subtitle-1">{{ $t('guide.aprex_con3') }}</p>
      </div>
    </v-col>

    <v-col class="part2 pa-0" cols="12">
      <div ref="part2" class="pa-4">
        <div class="text-h3">Part 2</div>
        <div class="text-h4"><b>What is feature</b></div>
        <div class="text-h5">{{ $t('guide.feature_title') }}</div>
      </div>

      <div class="pa-4">
        <v-card dark>
          <v-card-text class="text-subtitle-1">{{ $t('guide.feature_con1') }}</v-card-text>
        </v-card>
        <v-card dark class="mt-2">
          <v-card-text class="text-subtitle-1">{{ $t('guide.feature_con2') }}</v-card-text>
        </v-card>
        <v-card dark class="mt-2">
          <v-card-text class="text-subtitle-1">{{ $t('guide.feature_con3') }}</v-card-text>
        </v-card>
        <v-card dark class="mt-2">
          <v-card-text class="text-subtitle-1">{{ $t('guide.feature_con4') }}</v-card-text>
        </v-card>
        <v-card dark class="mt-2">
          <v-card-text class="text-subtitle-1">{{ $t('guide.feature_con5') }}</v-card-text>
        </v-card>

        <v-card class="mt-2">
          <v-card-title>{{ $t('guide.feature_explain') }}</v-card-title>
          <v-card-text>
            <div>{{ $t('guide.feature_block_label') }}</div>
            <div>{{ $t('guide.feature_block_con') }}</div>
            <div>{{ $t('guide.feature_nft_label') }}</div>
            <div>{{ $t('guide.feature_nft_con') }}</div>
          </v-card-text>
        </v-card>
      </div>
    </v-col>

    <v-col class="pa-0" cols="12">
      <div ref="part3" class="pa-4">
        <div class="text-h3">Part 3</div>
        <div class="text-h4">How to APREX</div>
      </div>

      <div class="pa-4">
        <v-card color="red" class="mt-2" dark>
          <div class="d-flex justify-start align-center space-between pa-4">
            <v-img max-width="100" :src="buyingSvg" />
            <v-card-title>Buying process</v-card-title>
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="buyingMore">more</v-btn>
          </v-card-actions>
        </v-card>

        <v-card color="blue" class="mt-2" dark>
          <div class="d-flex justify-start align-center space-between pa-4">
            <v-img max-width="100" :src="sellingSvg" />
            <v-card-title>Buying process</v-card-title>
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="sellingMore">more</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import pageImg from '@/assets/img/page.jpg';
import buyingSvg from '@/assets/img/svg/buying.svg';
import sellingSvg from '@/assets/img/svg/selling.svg';

export default {
  data() {
    return { pageImg, buyingSvg, sellingSvg };
  },
  methods: {
    buyingMore() {
      window.open('/pdfs/buyingProcess.pdf', '_blank');
    },
    sellingMore() {
      window.open('/pdfs/sellingProcess.pdf', '_blank');
    },
  },
};
</script>

<style scoped>
.part1:before {
  background: -webkit-linear-gradient(180deg, #5a82f6 0%, rgba(255, 255, 255, 0) 100%);
  background: -moz-linear-gradient(180deg, #5a82f6 0%, rgba(255, 255, 255, 0) 100%);
  background: -o-linear-gradient(180deg, #5a82f6 0%, rgba(255, 255, 255, 0) 100%);
  background: linear-gradient(180deg, #5a82f6 0%, rgba(255, 255, 255, 0) 100%);
}

.part1 {
  background: -webkit-linear-gradient(130deg, #2698ea 0%, #ffdec4 53%, #f85b62 100%);
  background: -moz-linear-gradient(130deg, #2698ea 0%, #ffdec4 53%, #f85b62 100%);
  background: -o-linear-gradient(130deg, #2698ea 0%, #ffdec4 53%, #f85b62 100%);
  background: linear-gradient(130deg, #2698ea 0%, #ffdec4 53%, #f85b62 100%);
}

.part2 {
  background-color: #eeeeee;
}
</style>
