import axios from 'axios';

export async function googleLogin({ token }: { token: string }) {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/google`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
}
