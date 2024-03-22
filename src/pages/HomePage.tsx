import { useNavigate } from 'react-router-dom';

import landingImage from '@/assets/landing.png';
import appDownloadImage from '@/assets/appDownload.png';

import Searchbar, { SearchForm } from '@/components/Searchbar';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col bg-white rounded-lg shadow-md py-8 gap-5 text-center -mt-16 md:px-32'>
        <h1 className='text-2xl md:text-5xl px-1 font-bold tracking-tight text-orange-500'>
          Tuck into a takeaway today
        </h1>
        <span className='text-xl'>Food is just a click away!</span>
        <Searchbar
          placeholder='Search by City or Town'
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className='grid md:grid-cols-2 gap-5'>
        <img src={landingImage} alt='Landing image' />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <span className='font-bold text-xl md:text-3xl tracking-tighter'>
            Order takeaway even faster!
          </span>
          <span>
            Download the HappyMeals App for faster ordering and personalised
            recommandations.
          </span>
          <img src={appDownloadImage} alt='App download image' />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
