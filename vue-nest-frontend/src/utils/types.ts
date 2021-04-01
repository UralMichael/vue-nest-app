import { Vue } from "vue/types/vue";

export interface VFormInterface extends Vue {
  validate(): boolean;
}
