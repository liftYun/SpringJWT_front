<!-- src/components/Home.vue -->
<template>
  <div>
    <div v-if="!loggedIn">
      <button @click="$router.push('/login')">로그인</button>
      <button @click="$router.push('/signup')">회원가입</button>
    </div>
    <div v-else>
      {{ username }}님 로그인 중
      <button @click="logoutAndReload">로그아웃</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { isLoggedIn, getUsername, logout } from '../services/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const loggedIn = ref(false);
    const username = ref('');

    // 마운트 직후, 서비스 상태 반영
    onMounted(() => {
      loggedIn.value = isLoggedIn();
      username.value = getUsername();
    });

    const logoutAndReload = async () => {
      // 1) 백엔드에도 호출하고
      await logout();
      // 2) 현재 페이지 새로고침
      router.go(0);

    };

    return { loggedIn, username, logoutAndReload };
  }
};
</script>
