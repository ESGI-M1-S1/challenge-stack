'use client';
import React, { useEffect, useState } from "react";
import { DataUserForm } from "@/app/my-profile/components/DataUserForm";
import { getUserById } from "@/modules/users";

const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = sessionStorage.getItem('user');
      const fetchedUser = await getUserById(storedUserId);
      setUser(fetchedUser);
    };
    
    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <section>
      <DataUserForm user={user} />
    </section>
  );
};

export default Page;
