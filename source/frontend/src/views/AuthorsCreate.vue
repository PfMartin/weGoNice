<script setup lang="ts">
import { createAuthor } from '@/apis/weGoNice/authors';
import NotificationService from '@/services/notification.service';
import { useRouter } from 'vue-router';
import AuthorInfo from '@/components/AuthorInfo.vue';
import { OperationMode } from '@/utils/constants';
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

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
  console.log(author.value);
};

const cancel = () => {
  router.push({ name: 'AuthorsOverview' });
};

const submit = async (): Promise<void> => {
  const { status, data } = await createAuthor(author.value);

  switch (status) {
    case 201:
      NotificationService.addNotification(
        'success',
        `Author '${author.value.name}' has successfully been added`
      );
      router.push({ name: 'AuthorsOverview' });
      break;
    case 406:
      NotificationService.addNotification(
        'error',
        `There already is an author with the name '${author.value.name}'`
      );
      break;
    default:
      NotificationService.addNotification(
        'error',
        `The author could not be saved: ${data.msg}`
      );
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
    <div class="buttons">
      <ButtonComponent
        buttonText="Cancel"
        buttonIconName="close-circle"
        @on-click="cancel"
      />
      <ButtonComponent
        isPrimary
        buttonText="Save"
        buttonIconName="checkmark-done"
        @on-click="submit"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.authors-create {
  margin-top: 1rem;
  margin-right: 1rem;
  margin-left: calc($nav-bar-width + 1rem);
  background: $bg-color-mid;
  border-radius: $border-radius;

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
    padding-top: 0;
  }
}
</style>
