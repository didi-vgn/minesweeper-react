import Header from "../components/Header";
import ProfileButton from "../components/ProfileButton";
import AdventureMenu from "./AdventureMenu";

export default function Adventure() {
  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <div className='flex justify-center relative select-none silkscreen'>
        <div className='m-10 p-3 custom-border bg-gray-300 h-[45rem] w-[72rem]'>
          <div className='custom-border-rev h-full bg-gray-100 p-7'>
            <AdventureMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

//42.5
