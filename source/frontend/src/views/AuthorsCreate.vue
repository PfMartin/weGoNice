<script setup lang="ts">
import { ref, computed } from 'vue';
import { createAuthor } from '@/apis/weGoNice/authors';
import ValidationService from '@/services/validation.service';
import NotificationService from '@/services/notification.service';
import { useRouter } from 'vue-router';
import AuthorInfo from '@/components/AuthorInfo.vue';
import { OperationMode } from '@/utils/constants';

const router = useRouter();

const author: Authors.Author = {
  name: '',
  lastname: '',
  firstname: '',
  website: '',
  youTube: '',
  instagram: '',
  imageUrl: '',
};

// OLD Version with validation

const validationService = new ValidationService();
const isFirstTry = ref(true);

const name = ref('');
const nameError = ref('');
const updateName = (newValue: string): void => {
  name.value = newValue;
  if (!isFirstTry.value) {
    validateName();
  }
};
const validateName = (): void => {
  nameError.value = validationService.validateAuthorName(name.value);
};

const firstname = ref('');
const updateFirstname = (newValue: string): void => {
  firstname.value = newValue;
};

const lastname = ref('');
const updateLastname = (newValue: string): void => {
  lastname.value = newValue;
};

const website = ref('');
const websiteError = ref('');
const updateWebsite = (newValue: string): void => {
  website.value = newValue;
  if (!isFirstTry.value) {
    validateWebsite();
  }
};
const validateWebsite = (): void => {
  websiteError.value = validationService.validateWebsite(website.value);
};

const instagram = ref('');
const instagramError = ref('');
const updateInstagram = (newValue: string): void => {
  instagram.value = newValue;
  if (!isFirstTry.value) {
    validateInstagram();
  }
};
const validateInstagram = (): void => {
  instagramError.value = validationService.validateInstagram(instagram.value);
};

const youTube = ref('');
const youTubeError = ref('');
const updateYouTube = (newValue: string): void => {
  youTube.value = newValue;
  if (!isFirstTry.value) {
    validateYouTube();
  }
};
const validateYouTube = (): void => {
  youTubeError.value = validationService.validateYouTube(youTube.value);
};

const imageUrl = ref('');
const imageUrlError = ref('');
const updateImageUrl = (newValue: string): void => {
  imageUrl.value = newValue;
  if (!isFirstTry.value) {
    validateImageUrl();
  }
};
const validateImageUrl = (): void => {
  imageUrlError.value = validationService.validateImageUrl(youTube.value);
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

const cancel = () => {
  router.push({ name: 'AuthorsOverview' });
};

const submit = async (): Promise<void> => {
  isFirstTry.value = false;

  if (isValid.value) {
    const body: Authors.Author = {
      name: name.value,
      lastname: lastname.value,
      firstname: firstname.value,
      website: website.value,
      instagram: instagram.value,
      youTube: youTube.value,
      imageUrl: imageUrl.value,
    };

    const { status, data } = await createAuthor(body);

    switch (status) {
      case 201:
        NotificationService.addNotification(
          'success',
          `Author '${name.value}' has successfully been added`
        );
        router.push({ name: 'AuthorsOverview' });
        break;
      case 406:
        NotificationService.addNotification(
          'error',
          `There already is an author with the name '${name.value}'`
        );
        break;
      default:
        NotificationService.addNotification(
          'error',
          `The author could not be saved: ${data.msg}`
        );
    }
  }
};
</script>

<template>
  <div class="authors-create">
    <AuthorInfo :initialData="author" :mode="OperationMode.Create" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.authors-create {
  margin: 1rem;
  margin-left: calc($nav-bar-width + 1rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background: $bg-color-dark;
    max-width: 700px;
    border-radius: $border-radius;
    color: $text-color;

    h2 {
      margin: 0;
      padding: 0;
    }

    .name-info {
      display: flex;
      gap: 1rem;
      padding: 0 1rem;
      justify-content: space-between;

      & * {
        width: 45%;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
