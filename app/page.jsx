import Link from "next/link";
import ProductInfo from "./components/Home/ProductInfo";
import Text from "./components/Home/Text";
import ProductDetail from "./components/Home/ProductDetail";
import TwoPicture from "./components/Home/TwoPicture";
import ReviewsSection from "./components/Home/ReviewsSection";
import MoreProduct from "./components/Home/MoreProduct";
import Footer from "./components/Home/Footer";
import FourPhototo from "./components/Home/FourPhoto";
import Video from "./components/Home/Video";

export default function Home() {
  return (
    <>
      <br />
      <main className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl bg-[#f5f5f5] mx-auto rounded-3xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 border-2">
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 rounded-xl bg-white">
          {/* Breadcrumb */}
          <div className="mb-6 text-black">
              <div className="flex items-center gap-2 text-sm">
                  <Link href="/" className="text-black hover:underline font-medium">Home</Link>
                  <span className="text-black">/</span>
                  <Link href="/shop" className="text-black hover:underline font-medium">Shop</Link>
                  <span className="text-black">/</span>
                  <span className="text-black font-semibold">Nadetta Coat Beige</span>
              </div>
          </div>
          <FourPhototo />
          <br />  {/* valid */}
          <Text />
        </div>

        {/* FIXED ASSET PATH */}

        <div className="bg-white">

          <Video />
          <ProductDetail />
          <TwoPicture />
          <ReviewsSection />
          <MoreProduct />
        </div>

      </main>
      {/* <Footer /> */}
    </>
  );
}
