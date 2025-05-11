<!-- <template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>아이디:</label>
        <input v-model="username" required />
      </div>
      <div>
        <label>비밀번호:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </template>
  
  <script>
  import { signup } from '../services/auth';
  import { ref } from 'vue';
  
  export default {
    setup(_, { router }) {
      const username = ref('');
      const password = ref('');
      const handleSubmit = async () => {
        try {
          await signup(username.value, password.value);
          router.push('/login');
        } catch (e) {
          alert('회원가입 실패');
        }
      };
      return { username, password, handleSubmit };
    }
  };
</script> -->

<template>
  <form @submit.prevent="handleSubmit">
    <div>
        <label>아이디:</label>
        <input v-model="username" required />
      </div>
      <div>
        <label>비밀번호:</label>
        <input type="password" v-model="password" required />
      </div>
    <button type="submit">회원가입</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '../services/auth';

export default {
  setup() {
    const router = useRouter();         // ← router 주입
    const username = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      try {
        await signup(username.value, password.value);
        // signup이 성공했을 때만 실행
        router.push('/login');
      } catch (e) {
        alert('회원가입 실패');
      }
    };

    return { username, password, handleSubmit };
  }
};
</script>
