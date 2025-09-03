import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import UserInfoBadge from "./components/UserInfoBadge";
import { LoaderCircle } from "lucide-react";
import RepoCard from "./components/RepoCard";
import useDebounce from "./hooks/useDebounce";
import Copyright from "./components/Copyright";

const App = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userRepositories, setUserRepositories] = useState<UserRepositories[]>([]);

    const debouncedSearchTerm = useDebounce(username, 800);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setUserData(null);
            setUserRepositories([]);
            if (debouncedSearchTerm === "") return;
            try {
                setIsFetching(true);
                const requestOptions = {
                    headers: {
                        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
                    }
                }

                const res = await fetch(`https://api.github.com/users/${debouncedSearchTerm}`, requestOptions);

                if (!res.ok) return;

                const userProfileData: UserData = await res.json();
                setUserData(userProfileData);
                console.log(userProfileData);

                const userRepositories = await fetch(userProfileData.repos_url, requestOptions).then(res => res.json());
                setUserRepositories(userRepositories);
                console.log(userRepositories);

            } catch {
                console.error("There was an error fetching the GitHub Profile");
            } finally {
                setIsFetching(false);
            }
        }
        fetchUserProfile();
    }, [debouncedSearchTerm]);

    return (
        <main className="size-full">
            <Copyright />
            <div className="relative w-full h-[200px]">
                <img src="/images/hero-image-github-profile-sm.jpg" alt="Hero Image" className="size-full object-cover" />
                <SearchInput username={username} setUsername={setUsername} />
            </div>
            <div className="w-full">
                {isFetching ? (
                    <div className="state-container">
                        <LoaderCircle className="size-12 animate-spin text-white" />
                        <h4 className="text-2xl mt-4 animate-pulse text-grey-light">Fetching user details</h4>
                    </div>
                ) : !userData && debouncedSearchTerm !== "" ? (
                    <div className="state-container">
                        <h4 className="text-2xl text-white">No user was found</h4>
                        <p className="text-grey-light mt-4 text-sm">
                            The username you entered could not be found. Please try using a entering username
                        </p>
                    </div>
                ) : !userData && debouncedSearchTerm === "" ? (
                    <div className="state-container">
                        <h4 className="text-2xl text-white">Search for a username</h4>
                        <p className="text-grey-light mt-4 text-sm">Type in a username to fetch its GitHub profile data</p>
                    </div>
                ) : userData && (
                    <div className="user-github-section">
                        <div className="user-top-section">
                            <div className="github-image">
                                <img src={userData && userData.avatar_url ? userData.avatar_url : "/images/github-icon.svg"} alt="GitHub Icon" className={`size-full ${userData.avatar_url && "rounded-xl"}`} />
                            </div>
                            <div className="user-basic-info">
                                <UserInfoBadge title="Followers" data={userData.followers || 0} />
                                <UserInfoBadge title="Following" data={userData.following || 0} />
                                <UserInfoBadge title="Location" data={userData.location || ""} />
                            </div>
                        </div>
                        <section className="user-repositories-section">
                            <h1 className="text-[32px] text-grey-light">GitHub</h1>
                            <h2 className="text-base text-grey-light">How people build software.</h2>
                            {userRepositories?.length > 0 ? (
                                <>
                                    <div className="user-repositories-grid">
                                        {userRepositories.map((userRepo) => (
                                            <RepoCard key={userRepo.id} {...userRepo} />
                                        ))}
                                    </div>
                                    <button
                                        className="mt-12 bg-transparent w-full text-center cursor-pointer text-grey-light"
                                    >
                                        View all repositories
                                    </button>
                                </>
                            ) : (
                                <div>
                                    This user does not have any repositories
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </main>
    )
}

export default App;