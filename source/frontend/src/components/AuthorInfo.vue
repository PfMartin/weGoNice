<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { checkFileTypeValid } from '@/utils/validation';

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
  fileInput.value?.click();
};

const getFileName = (fileArray: string[]): string | null => {
  const [fName, typeExtension] = fileArray;

  const validationErr = checkFileTypeValid(typeExtension);
  if (validationErr) {
    notificationService.addNotification('error', validationErr);
    isFileLoading.value = false;
    return null;
  }
  const fType = typeExtension.toLowerCase();

  return `${fName}.${fType}`;
};

const uploadFileName = ref(props.initialData.imageName);
const executeUpload = async () => {
  isFileLoading.value = true;

  const pathArray = fileInput.value?.value.split('\\') || [];

  const fName = getFileName(pathArray[pathArray.length - 1].split('.'));

  if (!fName) {
    return;
  }

  uploadFileName.value = fName;

  const fileToUpload =
    fileInput.value && fileInput.value.files?.length
      ? fileInput.value?.files[0]
      : null;

  if (props.mode === OperationMode.Edit && fileToUpload) {
    const res = await uploadFile(route.params.id, fileToUpload);

    if (res.status !== 200) {
      notificationService.addNotification(
        'error',
        'Something went wrong while uploading the picture.'
      );
    }
    await updateImage();
    publishBody();
    return;
  } else if (props.mode === OperationMode.Create && fileToUpload) {
    const res = await uploadFileTmp(fileToUpload);
    if (res.status !== 200) {
      notificationService.addNotification(
        'error',
        'Something went wrong while uploading the picture.'
      );
    }
    await updateImage();
    publishBody();
    return;
  }
};

/* Handle User Input */
const name = ref(props.initialData.name);
const updateName = (newValue: string) => {
  if (newValue !== name.value) {
    name.value = newValue;
    publishBody();
  }
};

const firstName = ref(props.initialData.firstName);
const updateFirstname = (newValue: string): void => {
  if (newValue !== firstName.value) {
    firstName.value = newValue;
    publishBody();
  }
};

const lastName = ref(props.initialData.lastName);
const updateLastname = (newValue: string): void => {
  if (newValue !== lastName.value) {
    lastName.value = newValue;
    publishBody();
  }
};

const website = ref(props.initialData.website);
const updateWebsite = (newValue: string) => {
  if (newValue !== website.value) {
    website.value = newValue;
    publishBody();
  }
};

const instagram = ref(props.initialData.instagram);
const updateInstagram = (newValue: string) => {
  if (newValue !== instagram.value) {
    instagram.value = newValue;
    publishBody();
  }
};

const youTube = ref(props.initialData.youTube);
const updateYouTube = (newValue: string) => {
  if (newValue !== youTube.value) {
    youTube.value = newValue;
    publishBody();
  }
};

const isFileLoading = ref(false);
const imageName = ref(props.initialData.imageName);

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
const publishBody = async (): Promise<void> => {
  if (!isValid.value) {
    return;
  }

  const body = {
    name: name.value,
    firstName: firstName.value,
    lastName: lastName.value,
    website: website.value,
    instagram: instagram.value,
    youTube: youTube.value,
    imageName: uploadFileName.value,
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

const imgSrc = ref('');
const updateImage = async (): Promise<void> => {
  let url!: string | WeGoNiceApi.RequestResponse;

  let name = uploadFileName.value;

  const id = props.initialData?.id;
  const fileToUpload =
    fileInput.value && fileInput.value.files ? fileInput.value?.files[0] : null;

  if (props.mode === OperationMode.Edit && id) {
    if (fileToUpload) {
      const fName = getFileName(name.split('.'));

      if (!fName) {
        return;
      }

      name = `${dateToString(new Date())}-${props.initialData.id}-${fName}`;
    }

    url = await getImage(name);
  } else if (props.mode === OperationMode.Create && fileToUpload) {
    const fName = getFileName(name.split('.'));

    if (!fName) {
      return;
    }

    name = fName;

    url = await getImageTmp(name);
  }

  imageName.value = name;
  imgSrc.value = url as string;
  isFileLoading.value = false;
};

onMounted(async () => {
  if (props.mode === OperationMode.Create) {
    document.getElementById('name')?.focus();
  } else {
    isFileLoading.value = true;
  }
  await updateImage();
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
              uploadFileName.length > 30
                ? `${uploadFileName.slice(0, 30)}...`
                : uploadFileName || 'No file chosen...'
            }}
          </p>
        </div>
      </Transition>
      <SpinnerComponent v-if="isFileLoading" />
      <ion-icon v-else-if="!uploadFileName && !imgSrc" name="person" />
      <img
        v-else-if="uploadFileName && imgSrc"
        :src="imgSrc"
        alt="Author Picture"
      />
    </div>
    <div class="info">
      <div class="info-section">
        <TextInputField
          headline="Name"
          iconName="person"
          id="name"
          type="text"
          :initialValue="name"
          placeholder="Insert the author's name"
          :inputError="nameError"
          @changed="updateName"
          isDark
          withErrorHandling
        />
        <TextInputField
          headline="First name"
          iconName="person"
          id="firstName"
          type="text"
          :initialValue="firstName"
          placeholder="Insert the author's first name"
          @changed="updateFirstname"
          isDark
          withErrorHandling
        />
        <TextInputField
          headline="Last name"
          iconName="person"
          id="lastName"
          type="text"
          :initialValue="lastName"
          placeholder="Insert the author's last name"
          @changed="updateLastname"
          isDark
          withErrorHandling
        />
      </div>
      <div class="info-section">
        <TextInputField
          headline="Website"
          iconName="earth"
          id="website"
          type="text"
          :initialValue="website"
          :inputError="websiteError"
          placeholder="Insert author's website URL"
          @changed="updateWebsite"
          isDark
          withErrorHandling
        />
        <TextInputField
          headline="Instagram"
          iconName="logo-instagram"
          id="instagram"
          type="text"
          :initialValue="instagram"
          placeholder="Insert the author's Instagram URL"
          :inputError="instagramError"
          @changed="updateInstagram"
          isDark
          withErrorHandling
        />
        <TextInputField
          headline="YouTube"
          iconName="logo-youtube"
          id="youtube"
          type="text"
          :initialValue="youTube"
          placeholder="Insert the author's YouTube URL"
          :inputError="youTubeError"
          @changed="updateYouTube"
          isDark
          withErrorHandling
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
