import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const getPost = [
    { photoUrl: "https://cdn.imweb.me/thumbnail/20200331/368d2a50dac40.jpg", id: "1" },
    { photoUrl: "https://ganpandirect.com/sign_picture/20210719025642_1_0.jpg", id: "2" },
    {
      photoUrl:
        "https://sonoad.com/wp-content/uploads/2021/05/%EA%B0%88%EB%B0%94-%EA%B0%84%ED%8C%90-%EB%A0%88%ED%84%B0%EB%A7%81-%EC%98%88%EC%81%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%EA%B0%84%ED%8C%90-2.jpg",
      id: "3",
    },
    {
      photoUrl: "https://shop-phinf.pstatic.net/20230113_185/1673600302793ceJPr_JPEG/1.jpg",
      id: "4",
    },
  ];
  return (
    <main className="flex flex-col items-center gap-10">
      <div className="flex justify-between gap-10">
        <div className="flex flex-col justify-center gap-6">
          <Image width={530} height={143} src="/main_content.svg" alt="아이덴티티와 디자인을 연결하다" />
          <div className="flex gap-2.5">
            <Link href={"tel:010-7225-0870"} target="_blank" className="main-button">
              <Image width={17} height={13} src="/phone.svg" alt="전화문의" />
              전화문의
            </Link>
            <button className="main-button">
              <Image width={15} height={13} src="/kakao.svg" alt="카톡상담" />
              카톡상담
            </button>
            <Link href={"https://www.instagram.com/yomi_design_/"} target="_blank" className="main-button">
              <Image width={13} height={13} src="/insta.svg" alt="인스타그램" />
              인스타그램
            </Link>
            <Link href={"https://blog.naver.com/yomi_design"} target="_blank" className="main-button">
              <Image width={15} height={13} src="/naver_blog.svg" alt="블로그" />
              블로그
            </Link>
          </div>
        </div>
        <picture>
          <source />
          <Image width={353} height={235} src="main_logo.svg" alt="로고" />
        </picture>
      </div>
      <div className="contents-center gap-6">
        {getPost.map((post) => (
          <Link
            href={post.id}
            key={post.id}
            className="border-[3px] border-black w-[230px] h-[230px] contents-center overflow-hidden object-cover"
          >
            <Image src={post.photoUrl} width={230} height={230} alt="시공 사진" />
          </Link>
        ))}
      </div>
    </main>
  );
}
