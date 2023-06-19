<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { OperationMode } from '@/utils/constants';
import TextInputField from '@/components/TextInputField.vue';
import ValidationService from '@/services/validation.service';
import { updateAuthorById } from '@/apis/weGoNice/authors';
import {
  uploadFile,
  getImage,
  uploadFileTmp,
  getImageTmp,
} from '@/apis/weGoNice/files';
import { useRoute } from 'vue-router';
import notificationService from '@/services/notification.service';
import { dateToString } from '@/utils/utility-functions';

const props = defineProps<{
  initialData: Authors.Author;
  mode: OperationMode;
}>();

const emit = defineEmits<{
  (e: 'on-change', body: Authors.Author): void;
}>();

const hasPictureOverlay = ref(false);
const togglePictureOverlay = () => {
  hasPictureOverlay.value = !hasPictureOverlay.value;
};

/* Handle File Input */
const fileInput = ref<HTMLInputElement | null>(null);
const openUploadWindow = () => {
  if (!isValid.value) {
    notificationService.addNotification(
      'error',
      `Please make sure there aren't any errors in the input fields before you add an image.`
    );
    return;
  }
  fileInput.value?.click();
};

const fileName = ref(props.initialData.imageName);
const executeUpload = async () => {
  if (!isValid.value) {
    return;
  }

  const pathArray = fileInput.value?.value.split('\\') || [];
  const fileNameArray = pathArray[pathArray.length - 1].split('.');
  const fName = fileNameArray[0];
  const fType = fileNameArray[1].toLowerCase();

  fileName.value = `${fName}.${fType}`;

  const file =
    fileInput.value && fileInput.value.files ? fileInput.value?.files[0] : null;

  if (props.mode === OperationMode.Edit && file) {
    const res = await uploadFile(route.params.id, file);
    if (res.status !== 200) {
      notificationService.addNotification(
        'error',
        'Something went wrong while uploading the picture.'
      );
    }
    emitInput();
    return;
  } else if (props.mode === OperationMode.Create && file) {
    const res = await uploadFileTmp(file);
    if (res.status !== 200) {
      notificationService.addNotification(
        'error',
        'Something went wrong while uploading the picture.'
      );
    }
    emitInput();
    return;
  }

  const body = {
    name: name.value,
    firstname: firstname.value,
    lastname: lastname.value,
    website: website.value,
    instagram: instagram.value,
    youTube: youTube.value,
    imageName: fileName.value,
  };

  emit('on-change', body);
};

/* Handle User Input */
const name = ref(props.initialData.name);
const updateName = (newValue: string) => {
  if (newValue !== name.value) {
    name.value = newValue;
    emitInput();
  }
};

const firstname = ref(props.initialData.firstname);
const updateFirstname = (newValue: string): void => {
  if (newValue !== firstname.value) {
    firstname.value = newValue;
    emitInput();
  }
};

const lastname = ref(props.initialData.lastname);
const updateLastname = (newValue: string): void => {
  if (newValue !== lastname.value) {
    lastname.value = newValue;
    emitInput();
  }
};

const website = ref(props.initialData.website);
const updateWebsite = (newValue: string) => {
  if (newValue !== website.value) {
    website.value = newValue;
    emitInput();
  }
};

const instagram = ref(props.initialData.instagram);
const updateInstagram = (newValue: string) => {
  if (newValue !== instagram.value) {
    instagram.value = newValue;
    emitInput();
  }
};

const youTube = ref(props.initialData.youTube);
const updateYouTube = (newValue: string) => {
  if (newValue !== youTube.value) {
    youTube.value = newValue;
    emitInput();
  }
};

const imageName = ref(props.initialData.imageName);

watch(fileName, () => {
  setTimeout(() => {
    updateImage();
  }, 200);
});

/* Validation */
const validationService = new ValidationService();

const nameError = ref(validationService.validateAuthorName(name.value));
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
  youTubeError.value = validationService.validateYouTube(youTube.value);
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

/* Emit Input */
const route = useRoute();
const emitInput = async (): Promise<void> => {
  if (!isValid.value) {
    return;
  }

  const body = {
    name: name.value,
    firstname: firstname.value,
    lastname: lastname.value,
    website: website.value,
    instagram: instagram.value,
    youTube: youTube.value,
    imageName: fileName.value,
  };

  if (props.mode === OperationMode.Edit) {
    const { status, data } = await updateAuthorById(route.params.id, body);

    if (status !== 200) {
      notificationService.addNotification(
        'error',
        `The author could not be updated: ${data.msg}`
      );
    }

    return;
  }

  emit('on-change', body);
};

const img = ref('');
const updateImage = async (): Promise<void> => {
  let name = fileName.value;

  const id = props.initialData.id || undefined;
  const file =
    fileInput.value && fileInput.value.files ? fileInput.value?.files[0] : null;

  if (props.mode === OperationMode.Edit && id && file) {
    const fileNameArray = name.split('.');
    const fileType = fileNameArray[1].toLowerCase();

    name = `${dateToString(new Date())}-${props.initialData.id}-${
      fileNameArray[0]
    }.${fileType}`;
  } else if (props.mode === OperationMode.Create && file) {
    const fileNameArray = name.split('.');
    const fileType = fileNameArray[1].toLowerCase();

    name = `${fileNameArray[0]}.${fileType}`;
  }

  let url!: string | WeGoNiceApi.RequestResponse;

  if (props.mode === OperationMode.Create && file) {
    url = await getImageTmp(name);
  } else if (props.mode === OperationMode.Edit) {
    url = await getImage(name);
  }

  img.value = url as string;
  imageName.value = name;
};

onMounted(() => {
  updateImage();
  if (props.mode === OperationMode.Create) {
    document.getElementById('name')?.focus();
  }
});
</script>

<template>
  <div class="author-info">
    <div
      class="picture"
      @click="openUploadWindow"
      @mouseenter="togglePictureOverlay"
      @mouseleave="togglePictureOverlay"
    >
      <Transition name="fade">
        <div v-show="hasPictureOverlay" class="picture-overlay">
          <input
            type="file"
            name="picture"
            id="fileInput"
            ref="fileInput"
            @change="executeUpload"
          />
          <ion-icon name="create"></ion-icon>
          <p>
            {{
              fileName.length > 30
                ? `${fileName.slice(0, 30)}...`
                : fileName || 'No file chosen...'
            }}
          </p>
        </div>
      </Transition>
      <img v-if="imageName" :src="img" alt="Author Picture" />
      <ion-icon v-if="!imageName" name="person" />
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
          headline="First name"
          iconName="person"
          id="firstname"
          :initialValue="firstname"
          placeholder="Insert the author's firstname"
          @changed="updateFirstname"
        />
        <TextInputField
          headline="Last name"
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
  box-shadow: $shadow;

  .picture {
    position: relative;
    border-radius: $border-radius;
    display: flex;
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: $bg-color-mid;
    height: 330px;

    img {
      max-height: 100%;
      border-radius: $border-radius;
    }

    .picture-overlay {
      position: absolute;
      z-index: 5;
      background: rgba($bg-color-lighter, 0.6);
      height: 100%;
      width: 100%;
      border-radius: $border-radius;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;

      input {
        position: fixed;
        left: 100vw;
      }

      ion-icon {
        opacity: 1;
        font-size: 3rem;
        color: $bg-color-mid;
      }
    }

    ion-icon {
      font-size: 6rem;
      color: $text-color;
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
