<script setup lang="ts">
import { createAuthor } from '@/apis/weGoNice/authors';
import NotificationService from '@/services/notification.service';
import { useRouter } from 'vue-router';
import AuthorInfo from '@/components/AuthorInfo.vue';
import { OperationMode } from '@/utils/constants';

const router = useRouter();

const author = ref<Authors.Author>({
  name: '',
  lastname: '',
  firstname: '',
  website: '',
  youTube: '',
  instagram: '',
  imageUrl: '',
});

const setData = (data: Authors.Author): void => {
  author.value = data;
};

// OLD Version with validation

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
    <AuthorInfo
      :initialData="author"
      :mode="OperationMode.Create"
      @on-change="setData"
    />
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
