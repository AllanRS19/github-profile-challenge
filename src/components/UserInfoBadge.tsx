const UserInfoBadge = ({ title, data }: UserInfoBadgeProps) => {
    return (
        <div className="flex items-center gap-4 w-fit md:h-fit p-4 text-xs rounded-lg bg-dark-blue text-white">
            <p>{title}</p>
            <div className="h-[16px] w-[0.5px] bg-grey-dark" />
            <p>
                {(title.toLowerCase() === "location" && data === "") && "N/A"}
                {title.toLowerCase() === "followers" || title.toLowerCase() === "following" ? data?.toLocaleString() : data}
            </p>
        </div>
    )
}

export default UserInfoBadge;