"use client";

import IntroduceText from "@/components/home/IntroduceText";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "../company-info";

const contactList = [
  { title: "카카오톡 문의", href: COMPANY.kakaoTalk },
  { title: "전화 문의", href: `tel:${COMPANY.phone}` },
  { title: "홈페이지", href: "/" },
  { title: "블로그", href: COMPANY.naverBlog },
  { title: "인스타그램", href: COMPANY.instagram },
];

export default function Page() {
  const { fetchMainPost } = usePost();
  const { data, isError, isLoading, error } = fetchMainPost;

  return (
    <div className="flex flex-col">
      <div className="divider-pattern mb-10" />
      <IntroduceText />
      <ul className="contents-center my-5 flex-col gap-2.5 xl:mx-auto xl:w-[45%] xl:flex-row xl:flex-wrap xl:rounded-full xl:border-2 xl:border-black xl:px-16 xl:py-10 xl:duration-500 xl:hover:bg-white">
        {" "}
        {contactList.map((contact) => (
          <li key={contact.title} className="contents-center w-full xl:w-auto xl:flex-1">
            <Link
              href={contact.href}
              className="contents-center w-2/3 rounded-full bg-black py-2 text-sm text-white shadow-md duration-500 hover:bg-gray001 xl:w-full"
            >
              {contact.title}
            </Link>
          </li>
        ))}
      </ul>

      {isLoading && <Loading />}
      {isError && <Error error={error.message} />}
      {!data ? (
        <p>업로드된 게시물이 없습니다.</p>
      ) : (
        <ul className="contents-center relative flex w-full flex-wrap gap-2.5 pb-7 xl:py-20">
          {data.map((post, index) => {
            const path = `/portfolio/${post.board?.type}/${post.board?.category?.eng_name}/${post.board?.id}`;
            const sourcePath = `${STORAGE_URL}/post/${post.board?.photoUrl[0]}`;
            const alt = post.board?.title ?? "시공사진";
            if (index >= 4) return;
            return (
              <li key={`${post.id}-${index}`}>
                <Link href={path} className="contents-center relative aspect-square w-[40vw] xl:w-[20vw]">
                  <Image src={sourcePath} alt={alt} fill className="aspect-square object-center" sizes="40vw" />
                </Link>
              </li>
            );
          })}
          <div className="absolute bottom-0 -z-10 aspect-[120/73] w-screen translate-y-[2px]">
            <Image src={"/linktree-bg.svg"} alt={""} fill className="aspect-[120/73]" sizes="100vw" />
          </div>
        </ul>
      )}
      <div className="divider-pattern-reverse" />
    </div>
  );
}
