import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // HttpOnly 쿠키 자동 포함
});

// 메모리 변수로만 보관
let accessToken = null;

// 1) 토큰이 있으면 헤더에 설정
export function setAuthHeader(token) {
  accessToken = token;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// 2) 로그인 시 호출 (기존)
export async function login(username, password) {
  const params = new URLSearchParams({ username, password });
  const res = await api.post("/login", params);
  const token = res.headers["authorization"]?.split(" ")[1];
  if (!token) throw new Error("No access token");
  setAuthHeader(token);
}

// 3) 초기화용: 페이지 로드 시 자동으로 호출
export async function refreshAccessToken() {
  try {
    const res = await api.post("/refresh");
    const token = res.headers["authorization"]?.split(" ")[1];
    if (token) {
      setAuthHeader(token);
    }
  } catch (e) {
    // Refresh 실패(쿠키 만료 등) 시에는
    setAuthHeader(null);
  }
}

export async function signup(username, password) {
  await api.post("/join", { username, password });
}

export async function logout() {
  try {
    // ① 백엔드 /logout 호출
    await api.post("/api/logout");
  } catch (e) {
    console.error("Logout API error", e);
    // 그래도 다음 로컬 정리는 해 줍니다
  }
  // ② 클라이언트 저장소·헤더 정리
  localStorage.removeItem("accessToken");
  delete api.defaults.headers.common["Authorization"];
}

// 4) 로그인 상태 확인
export function isLoggedIn() {
  return !!accessToken;
}

// 아주 간단한 JWT 페이로드 파서
function parseJwt(token) {
  try {
    // 1) 점(.)으로 자른 뒤 두 번째 부분(페이로드)만 가져와서
    const base64Url = token.split(".")[1];
    // 2) URL-safe Base64 → 일반 Base64로 복원
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // 3) atob로 디코드 → URI 디코딩 → JSON 파싱
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// 5) Username 추출 (jwt-decode 대신 parseJwt 사용)
export function getUsername() {
  if (!accessToken) return null;
  const payload = parseJwt(accessToken);
  return payload?.username || null;
}

export default api;
