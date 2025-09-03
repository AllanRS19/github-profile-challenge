import { calculateTimeAgo } from "../lib/utils";

const RepoCard = ({
    name,
    description,
    html_url,
    updated_at,
    stargazers_count,
    forks_count,
    allow_forking
}: UserRepositories) => {
    return (
        <a
            href={html_url}
            target="_blank"
            className="w-full flex flex-col gap-3 bg-[linear-gradient(95deg,#111729_3%,#1d1b48_99.61%)] rounded-lg p-4"
        >
            <h5 className="text-base text-grey-light">{name}</h5>
            <p className="text-sm text-grey-normal truncate">{description || "This repo does not have a description"}</p>
            <div className="flex items-center flex-wrap gap-4">
                {allow_forking && (
                    <div className="flex items-center gap-1">
                        <img src="/icons/Chield_alt.svg" alt="Chield" className="size-6" />
                        <p className="text-sm text-grey-normal">MIT</p>
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <img src="/icons/Nesting.svg" alt="Nesting Icon" className="size-6" />
                    <p className="text-sm text-grey-normal">{forks_count}</p>
                </div>
                <div className="flex items-center gap-1">
                    <img src="/icons/Star.svg" alt="Star Icon" className="size-6" />
                    <p className="text-sm text-grey-normal">{stargazers_count}</p>
                </div>
                <p className="text-xs text-grey-normal">
                    {calculateTimeAgo(updated_at)}
                </p>
            </div>
        </a>
    )
}

export default RepoCard;