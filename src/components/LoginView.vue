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
      <button type="submit">로그인</button>
    </form>
  </template>
  
  <script>
  import { login } from '../services/auth';
  import { ref } from 'vue';
  
  export default {
    setup(_, { router }) {
      const username = ref('');
      const password = ref('');
      const handleSubmit = async () => {
        try {
          await login(username.value, password.value);
          router.push('/');
        } catch (e) {
          alert('로그인 실패');
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
    <button type="submit">로그인</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter();      // ← 이렇게 가져와야 합니다
    const username = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      try {
        await login(username.value, password.value);
        // 로그인 성공 시에만 이동
        router.push('/');
      } catch (e) {
        // 실제 API 실패나 이동 에러 모두 여기로 잡히니,
        // 네트워크 로그를 함께 찍어보면 더 정확합니다.
        console.error('로그인 에러:', e);
        alert('로그인 실패');
      }
    };

    return { username, password, handleSubmit };
  }
};
</script>
