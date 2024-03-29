<script setup lang="ts">
import { createAuthor } from '@/apis/weGoNice/authors';
import NotificationService from '@/services/notification.service';
import { useRouter } from 'vue-router';
import AuthorInfo from '@/components/AuthorInfo.vue';
import { ButtonType, OperationMode } from '@/utils/constants';
import { ref, computed } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { removeImageTmp } from '@/apis/weGoNice/files';

const router = useRouter();

const author = ref<Authors.Author>({
  name: '',
  lastName: '',
  firstName: '',
  website: '',
  youTube: '',
  instagram: '',
  imageName: '',
});

const setData = (data: Authors.Author): void => {
  author.value = data;
};

const cancel = async () => {
  if (author.value.imageName) {
    await removeImageTmp(author.value.imageName);
  }

  router.push({ name: 'AuthorsOverview' });
};

const submit = async (): Promise<void> => {
  if (!hasName.value) {
    NotificationService.addNotification(
      'error',
      'Please provide all the information required for creating a new author'
    );
    return;
  }

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

const hasName = computed(() => author.value.name);
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
        :buttonType="ButtonType.Default"
        buttonText=""
        buttonIconName="arrow-back-outline"
        @on-click="cancel"
      />
      <div class="control-buttons">
        <ButtonComponent
          :buttonType="ButtonType.Delete"
          buttonText="Cancel"
          buttonIconName="trash"
          @on-click="cancel"
        />
        <ButtonComponent
          :buttonType="ButtonType.Primary"
          buttonText="Save"
          buttonIconName="checkmark-done"
          @on-click="submit"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.authors-create {
  margin: 1rem 1rem 1rem calc($nav-bar-width + 1rem);

  .buttons {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;

    .control-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
}
</style>
