import { menuItems } from "@/constants";
import styles from "./sidebar.module.css";
import MenuLinks from "./MenuLinks/MenuLinks";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { auth, signOut } from "@/app/auth";

const Sidebar = async () => {
  const { user } = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={user?.img || "/noavatar.png"}
          alt="user-image"
          height="50"
          width="50"
          priority
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user?.username}</span>
          <span className={styles.userTitle}>
            {user?.isAdmin ? "Administrator" : "Client"}
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className={styles.cat}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLinks key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
