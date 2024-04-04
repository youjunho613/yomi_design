import Image from "next/image";
import Link from "next/link";

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

export default function MainPostList() {
  return (
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
  );
}
