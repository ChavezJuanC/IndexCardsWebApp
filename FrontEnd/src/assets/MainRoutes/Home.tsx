import HomeBottomMenu from "../Components/HomeComponents/HomeBottomMenu";
import HomeTopMenu from "../Components/HomeComponents/HomeTopMenu";
import IndexCardArea from "../Components/HomeComponents/IndexCardArea";

function Home() {
    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full">
                <div className="mx-auto w-3/4">
                    <HomeTopMenu />
                </div>
                <div className="mt-30 mb-30">
                    <IndexCardArea />
                </div>
                <div className="mx-auto w-3/4">
                    <HomeBottomMenu />
                </div>
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}
export default Home;
