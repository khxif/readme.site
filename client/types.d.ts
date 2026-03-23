interface User {
  name: string;
  email: string;
  profilePicture: string;
  authProviderId: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface Project {
  id: string;
  name: string;
  code: string;
  status: 'PENDING' | 'SUCCESS';
  created_by: string;
  github_url: string;
}
