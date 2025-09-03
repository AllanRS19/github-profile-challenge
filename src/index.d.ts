declare interface SearchInputProps {
    username: string;
    setUsername: (username: string) => void;
}

declare interface UserInfoBadgeProps {
    title: string;
    data?: string | number;
}

declare interface UserData {
    avatar_url: string;
    email?: string;
    followers: number;
    following: number;
    name?: string;
    repos_url: string;
    public_repos?: number;
    location?: string;
}

declare interface UserRepositories {
    id: number;
    name: string;
    description: string;
    html_url: string;
    updated_at: string;
    stargazers_count: number;
    forks_count: number;
    allow_forking: boolean;
}