import UsersListCard from "@/components/usersListCard/UsersListCard";

export default function UserList() {
  return (
    <div className="w-full">
      <h2 className="text-[30px] font-[700] dark:text-pure_white mb-5 transition-all duration-300">All Users</h2>
      <div className="space-y-4">
        <UsersListCard />
      </div>
    </div>
  );
}
