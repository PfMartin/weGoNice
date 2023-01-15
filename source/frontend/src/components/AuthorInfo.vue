<script setup lang="ts">
import { ref, computed } from 'vue';
import { OperationMode } from '@/utils/constants';
import TextInputField from '@/components/TextInputField.vue';
import ValidationService from '@/services/validation.service';

const props = defineProps<{
  initialData: Authors.Author;
  mode: OperationMode;
}>();

/* Handle User Input */
const name = ref(props.initialData.name);
const updateName = (newValue: string) => {
  name.value = newValue;
  validateName();
};

const firstname = ref(props.initialData.firstname);
const updateFirstname = (newValue: string): void => {
  firstname.value = newValue;
};

const lastname = ref(props.initialData.lastname);
const updateLastname = (newValue: string): void => {
  lastname.value = newValue;
};

const website = ref(props.initialData.website);
const updateWebsite = (newValue: string) => {
  website.value = newValue;
  validateWebsite();
};

const instagram = ref(props.initialData.instagram);
const updateInstagram = (newValue: string) => {
  instagram.value = newValue;
  validateInstagram();
};

const youTube = ref(props.initialData.youTube);
const updateYouTube = (newValue: string) => {
  youTube.value = newValue;
  validateYouTube();
};

const imageUrl = ref(props.initialData.imageUrl);

/* Validation */
const validationService = new ValidationService();

const nameError = ref('');
const validateName = (): void => {
  nameError.value = validationService.validateAuthorName(name.value);
};

const websiteError = ref('');
const validateWebsite = (): void => {
  websiteError.value = validationService.validateWebsite(website.value);
};

const instagramError = ref('');
const validateInstagram = (): void => {
  instagramError.value = validationService.validateInstagram(instagram.value);
};

const youTubeError = ref('');
const validateYouTube = (): void => {
  youTubeError.value = validationService.validateYouTube(website.value);
};

const imageUrlError = ref('');
const validateImageUrl = (): void => {
  imageUrlError.value = validationService.validateImageUrl(imageUrl.value);
};

const isValid = computed((): boolean => {
  validateName();
  validateWebsite();
  validateInstagram();
  validateYouTube();

  return (
    !nameError.value &&
    !websiteError.value &&
    !instagramError.value &&
    !youTubeError.value
  );
});

/* Save Data*/
// const saveChanges = (): void => {
//   switch (props.mode) {
//     case OperationMode.Edit:
//       console.log('save edited author');
//       console.log(websiteError.value);
//       break;
//     default:
//       console.log('create new author');
//   }
// };
</script>

<template>
  <div class="author-info">
    <div class="picture">
      <img v-if="imageUrl" :src="imageUrl" alt="Author Picture" />
      <ion-icon v-else name="person" />
    </div>
    <div class="info">
      <div class="info-section">
        <TextInputField
          headline="Name"
          iconName="person"
          id="name"
          :initialValue="name"
          placeholder="Insert the author's name"
          :inputError="nameError"
          @changed="updateName"
        />
        <TextInputField
          headline="Firstname"
          iconName="person"
          id="firstname"
          :initialValue="firstname"
          placeholder="Insert the author's firstname"
          @changed="updateFirstname"
        />
        <TextInputField
          headline="Lastname"
          iconName="person"
          id="lastname"
          :initialValue="lastname"
          placeholder="Insert the author's lastname"
          @changed="updateLastname"
        />
      </div>
      <div class="info-section">
        <TextInputField
          headline="Website"
          iconName="earth"
          id="website"
          :initialValue="website"
          :inputError="websiteError"
          placeholder="Insert author's website URL"
          @changed="updateWebsite"
        />
        <TextInputField
          headline="Instagram"
          iconName="logo-instagram"
          id="instagram"
          :initialValue="instagram"
          placeholder="Insert the author's Instagram URL"
          :inputError="instagramError"
          @changed="updateInstagram"
        />
        <TextInputField
          headline="YouTube"
          iconName="logo-youtube"
          id="youtube"
          :initialValue="youTube"
          placeholder="Insert the author's YouTube URL"
          :inputError="youTubeError"
          @changed="updateYouTube"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';
.author-info {
  display: flex;
  background: $bg-color-mid;
  border-radius: $border-radius;
  padding: 1rem;
  max-height: 400px;
  gap: 1rem;

  .picture {
    border-radius: $border-radius;
    display: flex;
    flex: 1;
    min-width: 250px;
    max-width: 350px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: $bg-color-light;
    max-height: 300px;

    img {
      max-height: 100%;
    }

    ion-icon {
      font-size: 6rem;
      z-index: 1;
    }
  }

  .info {
    width: 100%;
    background: $bg-color-dark;
    border-radius: $border-radius;
    color: $text-color;
    padding: 1rem;
    display: flex;
    gap: 1rem;

    .info-section {
      padding: 5px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
