<template>
  <QPage class="t-grid t-place-items-center">
    <p>i18n {{ messages.hello }}</p>

    <div class="t-max-w-md t-flex t-gap-4">
      <QForm
        class="q-gutter-md"
        @submit="signIn({
          input: signInInput
        })"
        @reset="() => {
          signInInput.password = '',
          signInInput.username = ''
        }"
      >
        Sign In
        <QInput
          v-model="signInInput.username"
          filled
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <QInput
          v-model="signInInput.password"
          filled
          label="Your pass *"
          hint="Password :)"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <QBtn
            label="Submit"
            type="submit"
            color="primary"
          />
          <QBtn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </QForm>

      <QForm
        class="q-gutter-md"
        @submit="signUp({
          input: signUpInput
        })"
        @reset="() => {
          signUpInput.password = '',
          signUpInput.username = ''
        }"
      >
        Sign Up
        <QInput
          v-model="signUpInput.username"
          filled
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <QInput
          v-model="signUpInput.password"
          filled
          label="Your pass *"
          hint="Password :)"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <QBtn
            label="Submit"
            type="submit"
            color="primary"
          />
          <QBtn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </QForm>
    </div>

    <QBtn @click="fetchMe()">
      Fetch me!
    </QBtn>
    <div class="t-w-1/2">
      {{ (resultMe?.me || 'no') }}
    </div>

    <QBtn @click="signOut()">
      Sign out!
    </QBtn>
  </QPage>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  MeDocument, SignInDocument, SignOutDocument, type SignInInput, SignUpDocument, type SignUpInput,
} from 'src/shared/gql';
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const messages = computed(() => ({
  hello: t('greetings.hello'),
}));

const { result: resultMe, refetch: fetchMe } = useQuery(MeDocument);

const signUpInput: SignUpInput = reactive({
  password: '',
  username: '',
});
const { mutate: signUp, onDone: onSignUp } = useMutation(SignUpDocument);

const signInInput: SignInInput = reactive({
  password: '',
  username: '',
});
const { mutate: signIn, onDone: onSignIn } = useMutation(SignInDocument);
const { mutate: signOut, onDone: onSignOut } = useMutation(SignOutDocument);

onSignIn(() => fetchMe());
onSignUp(() => fetchMe());
onSignOut(() => resultMe.value = undefined);
</script>
src/shared/gql/generated/graphql
