import Profile from "@/components/profile";
import ResponsiveDrawer from "@/components/sidbar";

const ProfilePage = () => {
  return (
    <>
      <Profile />
    </>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return <ResponsiveDrawer>{page}</ResponsiveDrawer>;
};
export default ProfilePage;
