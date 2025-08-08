// All Places Data
const allPlaces = [
    // City - Beaches
    {
        category: 'city',
        title: 'Пляж Маракеш',
        description: 'Один из лучших пляжей в черте города, расположенный в 1 микрорайоне. Идеальное место для семейного отдыха с чистым песком и развитой инфраструктурой для комфортного времяпровождения.',
        image: 'https://static.tildacdn.com/tild6163-3931-4939-a135-666135643235/photo_2025-08-07_12-.jpg',
        address: '1Б микрорайон',
        mapLink: 'https://go.2gis.com/fSyJO'
    },
    {
        category: 'city',
        title: 'Пляж Достар',
        description: 'Популярный городской пляж в 1 микрорайоне с отличной инфраструктурой. Здесь можно провести весь день, наслаждаясь солнцем, морем и удобствами современного пляжного отдыха.',
        image: 'https://static.tildacdn.com/tild6134-3963-4063-b938-663031333434/photo_2025-08-07_12-.jpg',
        address: 'Прибрежная зона, 1/1',
        mapLink: 'https://go.2gis.com/MNoVx'
    },
    {
        category: 'city',
        title: 'Набережная',
        description: 'Прекрасное место для прогулок в 15 микрорайоне. Красивая набережная протяженностью несколько километров с видами на Каспийское море, идеальная для вечерних прогулок и фотосессий.',
        image: 'https://static.tildacdn.com/tild3536-6531-4333-b163-653737363939/photo_2025-08-07_12-.jpg',
        address: '15 микрорайон',
        mapLink: 'https://go.2gis.com/RJS9A'
    },
    
    // City - Restaurants
    {
        category: 'city',
        title: 'JETI',
        description: 'Казахская и авторская кухня в уютной атмосфере. Свежие морепродукты, локальные блюда и панорамный вид на море.',
        image: 'https://static.tildacdn.com/tild3334-6166-4238-a138-363431373732/photo_2025-08-07_12-.jpg',
        address: '30 мкр, 181 | +7 701 934 44 24',
        mapLink: 'https://2gis.kz/aktau/firm/70000001096234441'
    },
    {
        category: 'city',
        title: 'Бархан',
        description: 'Самые вкусные бургеры в Актау! Сочные котлеты, свежие булочки и уникальные соусы. Популярное место среди молодежи и любителей качественного фаст-фуда.',
        image: 'https://static.tildacdn.com/tild3639-3166-4033-b032-373230313164/photo_2025-08-07_12-.jpg',
        address: '+7 701 000 00 30',
        mapLink: 'https://2gis.kz/aktau/firm/70000001028544273?m=51.164301%2C43.638787%2F16'
    },
    {
        category: 'city',
        title: 'Koktem Cafe',
        description: 'Кофейня и десерты в уютной атмосфере. Идеальное место для встреч с друзьями или работы в спокойной обстановке.',
        image: 'https://static.tildacdn.com/tild6233-6562-4363-a633-363633613830/photo_2025-08-07_12-.jpg',
        address: '19 мкр | +7 776 029 63 03',
        mapLink: 'https://2gis.kz/aktau/firm/70000001089806061?m=51.15173%2C43.679917%2F16'
    },
    {
        category: 'city',
        title: 'Barashka Dine&Drink',
        description: 'Азербайджанская и средиземноморская кухня в стильном интерьере. Изысканные блюда, отличное вино и теплая атмосфера для незабываемого ужина.',
        image: 'https://static.tildacdn.com/tild6431-6139-4833-b136-626530386265/photo_2025-08-07_12-.jpg',
        address: '+7 700 444 07 71',
        mapLink: 'https://2gis.kz/aktau/firm/70000001033955631?m=51.176961%2C43.642602%2F16'
    },
    {
        category: 'city',
        title: 'Chechil Pub',
        description: 'Вечер с живой музыкой в уютной атмосфере паба. Отличное место для отдыха с друзьями, качественные напитки и регулярные концерты.',
        image: 'https://static.tildacdn.com/tild3332-6361-4262-b664-323431363634/photo_2025-08-07_12-.jpg',
        address: '7а мкр | +7 707 907 60 27',
        mapLink: 'https://2gis.kz/aktau/firm/70000001028527534?m=51.151283%2C43.643676%2F16'
    },
    
    // City - Kids (from city.html)
    {
        category: 'city',
        title: 'My Kids',
        description: 'Детский развлекательный центр в ТРК «Актау». Современные игровые автоматы, безопасные аттракционы и игровые зоны для детей всех возрастов. 16 мкр | +7 708 058 04 72',
        image: 'https://static.tildacdn.com/tild3236-3536-4562-b735-643066636262/__2025-08-07_130449.png',
        address: 'ТРК Актау 16-й микрорайон, 4 2 этаж',
        mapLink: 'https://go.2gis.com/mnHzX'
    },
    {
        category: 'city',
        title: 'Kids Park',
        description: 'Современный детский парк в БЦ Urban с разнообразными аттракционами и игровыми зонами. Безопасная среда для активного отдыха детей. 17 мкр | +7 700 659 05 68',
        image: 'https://static.tildacdn.com/tild6663-3961-4537-a565-373564326462/__2025-08-07_131934.png',
        address: 'БЦ Urban 17-й микрорайон, 22 5 этаж',
        mapLink: 'https://go.2gis.com/NgvJH'
    },
    {
        category: 'city',
        title: 'Парк аттракционов Сказка',
        description: 'Волшебный мир развлечений для всей семьи в 5а микрорайоне. Множество аттракционов, игровых площадок и сказочная атмосфера для незабываемых детских воспоминаний. +7 702 593 00 00',
        image: 'https://static.tildacdn.com/tild3663-6333-4038-a635-393136363033/__2025-08-07_132111.png',
        address: '5а микрорайон, 2',
        mapLink: 'https://go.2gis.com/nH3gl'
    },
    {
        category: 'city',
        title: 'Большой аквариум с рыбами осетровых пород',
        description: 'Экскурсия',
        image: 'https://static.tildacdn.com/tild6562-3234-4236-b634-336137353463/__2025-08-07_140016.png',
        address: '4а микрорайон, 39 отель Caspian Riviera',
        mapLink: 'https://go.2gis.com/BS1Na'
    },
    
    // City - Self Care & Medical
    {
        category: 'city',
        title: 'Zefir',
        description: 'Салон красоты',
        image: 'https://static.tildacdn.com/tild6636-6665-4934-b337-323032666562/__2025-08-07_152409.png',
        address: 'ТРК «Актау» +7 701 934 44 54',
        mapLink: 'https://go.2gis.com/YxoGK'
    },
    {
        category: 'city',
        title: 'Dental Art Studio',
        description: 'Стоматология',
        image: 'https://static.tildacdn.com/tild3638-3733-4431-a236-333666643465/__2025-08-07_152603.png',
        address: 'ЖК Caspyi Towers 17-й микрорайон, 5',
        mapLink: 'https://go.2gis.com/8nPSC'
    },
    {
        category: 'city',
        title: 'Dr.Omarov',
        description: 'Стоматология',
        image: 'https://static.tildacdn.com/tild3662-3534-4161-b136-383161663762/__2025-08-07_152741.png',
        address: 'ЖК Premium Plaza 18а микрорайон, 2',
        mapLink: 'https://go.2gis.com/9O8TB'
    },
    {
        category: 'city',
        title: 'Sofie MedGroup',
        description: 'Многопрофильная клиника',
        image: 'https://static.tildacdn.com/tild6134-3131-4764-a464-616265353861/__2025-08-07_153004.png',
        address: 'Больничный городок 1 1а микрорайон, 6',
        mapLink: 'https://go.2gis.com/PB6qH'
    },
    {
        category: 'city',
        title: 'Нейрон',
        description: 'Многопрофильная клиника',
        image: 'https://static.tildacdn.com/tild6461-3932-4539-a639-633333663531/__2025-08-07_153209.png',
        address: '1Б микрорайон, 3',
        mapLink: 'https://go.2gis.com/bLeex'
    },
    {
        category: 'city',
        title: 'Денсаулық',
        description: 'Медицинский центр',
        image: 'https://static.tildacdn.com/tild6236-3430-4561-b465-393866333562/__2025-08-07_153336.png',
        address: 'Больничный городок 2 26-й микрорайон, 71',
        mapLink: 'https://go.2gis.com/f4dQ0'
    },
    
    // City - Shopping
    {
        category: 'city',
        title: 'Желтый рынок',
        description: 'Большой рынок в городе Актау',
        image: 'https://static.tildacdn.com/tild6132-3437-4362-b664-306465383466/__2025-08-07_141021.png',
        address: '31-й микрорайон, 1',
        mapLink: 'https://go.2gis.com/iF7JI'
    },
    {
        category: 'city',
        title: 'ТРК Aktau',
        description: 'Торгово-развлекательный центр',
        image: 'https://static.tildacdn.com/tild3961-6336-4364-a633-366565376433/__2025-08-07_141304.png',
        address: '16-й микрорайон, 4',
        mapLink: 'https://go.2gis.com/Is2HX'
    },
    {
        category: 'city',
        title: 'ТЦ SHUM',
        description: 'Торговый центр',
        image: 'https://static.tildacdn.com/tild3530-3637-4833-b034-306439373834/__2025-08-07_141437.png',
        address: '4-й микрорайон, 74',
        mapLink: 'https://go.2gis.com/ZOOKV'
    },
    {
        category: 'city',
        title: 'ТЦ Saya Park',
        description: 'Торговый центр',
        image: 'https://static.tildacdn.com/tild6335-3535-4335-b239-636432353537/__2025-08-07_141616.png',
        address: '10-й микрорайон, 3',
        mapLink: 'https://go.2gis.com/E8Fya'
    },
    
    // Kids - Entertainment
    {
        category: 'kids',
        title: 'Страус-ферма',
        description: 'Уникальная возможность познакомиться с экзотическими птицами, покормить страусов и узнать много интересного о их жизни.',
        image: 'https://static.tildacdn.com/tild3731-3230-4639-b135-323563393939/__2025-08-07_160403.png',
        address: 'Промзона 6 | +7 701 743 53 06',
        mapLink: 'https://go.2gis.com/LHiNg'
    },
    {
        category: 'kids',
        title: 'My Kids',
        description: 'Современный детский развлекательный центр с безопасными аттракционами, игровыми зонами и кафе для всей семьи.',
        image: 'https://static.tildacdn.com/tild6165-6361-4565-a436-323066623262/__2025-08-07_160538.png',
        address: 'ТРК «Актау», 16 мкр | +7 708 058 04 72',
        mapLink: 'https://go.2gis.com/BrYCO'
    },
    {
        category: 'kids',
        title: 'Kids Park',
        description: 'Игровой парк с разнообразными активностями для детей разных возрастов. Безопасное и яркое пространство для веселого времяпрепровождения.',
        image: 'https://static.tildacdn.com/tild6663-3961-4537-a565-373564326462/__2025-08-07_131934.png',
        address: 'БЦ Urban, 17 мкр | +7 700 659 05 68',
        mapLink: 'https://go.2gis.com/tEW9I'
    },
    {
        category: 'kids',
        title: 'Парк аттракционов Сказка',
        description: 'Волшебный мир аттракционов для маленьких мечтателей. Карусели, качели и множество других развлечений в сказочной атмосфере.',
        image: 'https://static.tildacdn.com/tild3663-6333-4038-a635-393136363033/__2025-08-07_132111.png',
        address: '5а мкр | +7 702 593 00 00',
        mapLink: 'https://go.2gis.com/69MQr'
    },
    {
        category: 'kids',
        title: 'Парк Ақбота',
        description: 'Популярный городской парк с аттракционами и игровыми автоматами. Отличное место для прогулок и активного отдыха всей семьей.',
        image: 'https://static.tildacdn.com/tild3966-6436-4164-b561-303035376362/__2025-08-07_161310.png',
        address: '4а микрорайон, 18/3 киоск',
        mapLink: 'https://go.2gis.com/IoUTj'
    },
    {
        category: 'kids',
        title: 'Аквапарк Laguna',
        description: 'Современный аквапарк с горками, бассейнами и водными развлечениями для всех возрастов. Идеальное место для освежающего отдыха.',
        image: 'https://static.tildacdn.com/tild3430-6435-4765-a135-303961653534/__2025-08-07_161454.png',
        address: 'Самал 2 | +7 705 555 28 28',
        mapLink: 'https://go.2gis.com/yfmWb'
    },
    
    // Kids - Pools
    {
        category: 'kids',
        title: 'Бассейн ТРК Актау',
        description: 'Открытый бассейн в торгово-развлекательном комплексе с детской зоной и современными удобствами',
        image: 'https://static.tildacdn.com/tild3738-3334-4566-b662-633035626164/__2025-08-07_161742.png',
        address: '16 мкр, ТРК Актау',
        mapLink: 'https://go.2gis.com/yfL8x'
    },
    {
        category: 'kids',
        title: 'Санаторий Шагала',
        description: 'Открытый бассейн на территории санатория с лечебными и оздоровительными процедурами',
        image: 'https://static.tildacdn.com/tild6135-6335-4035-b762-643836623666/__2025-08-07_161616.png',
        address: '1 мкр, санаторий Шагала',
        mapLink: 'https://go.2gis.com/BgDo4'
    },
    
    // Kids - Hotels for kids
    {
        category: 'kids',
        title: 'Bopetime',
        description: 'Няня-центр',
        image: 'https://static.tildacdn.com/tild3330-6263-4265-b361-626466653363/869.jpg',
        address: 'ЖК Green Park 17-й микрорайон, 7',
        mapLink: 'https://go.2gis.com/T9n0G'
    },
    {
        category: 'kids',
        title: 'Супер няня',
        description: 'Няня-центр',
        image: 'https://static.tildacdn.com/tild3037-3434-4032-a438-333535303362/fmt_81_24_shuttersto.webp',
        address: 'ЖК Триумф 16-й микрорайон, 41',
        mapLink: 'https://go.2gis.com/O63yH'
    },
    
    // Nature - Wonders
    {
        category: 'nature',
        title: 'Бозжыра',
        description: 'Самая масштабная и впечатляющая достопримечательность всего Мангистау. Фантастические пейзажи и уникальные геологические формации в 270 км от Актау.',
        image: 'https://static.tildacdn.com/tild3964-6435-4464-b434-316334623435/__2025-08-07_133504.png',
        address: '270 км от Актау',
        mapLink: 'https://go.2gis.com/MvdLQ'
    },
    {
        category: 'nature',
        title: 'Подземная мечеть Шакпак-ата',
        description: 'Один из важнейших религиозных памятников Мангистау. Уникальная подземная мечеть, высеченная в скале, находится в 85 км от Актау.',
        image: 'https://static.tildacdn.com/tild6565-3539-4333-b262-383462633062/excurs_ad4593571a.jpg',
        address: '85 км от Актау',
        mapLink: 'https://go.2gis.com/C0AMY'
    },
    {
        category: 'nature',
        title: 'Солончак Тузбаир',
        description: 'Одна из самых фотогеничных достопримечательностей Мангистау. Белоснежные соляные равнины создают невероятные пейзажи в 230 км от Актау.',
        image: 'https://static.tildacdn.com/tild3632-3634-4434-a662-386561353533/__2025-08-07_133504.png',
        address: '230 км от Актау',
        mapLink: 'https://go.2gis.com/PnHDe'
    },
    {
        category: 'nature',
        title: 'Голубая бухта',
        description: 'Казахстанские Мальдивы! Невероятно красивая бухта с кристально чистой водой и живописными скалами. Идеальное место для отдыха и фотосессий.',
        image: 'https://static.tildacdn.com/tild3964-6335-4634-a565-376436613532/__2025-08-07_134133.png',
        address: 'Тупкараганский район, Мангистауская область',
        mapLink: 'https://go.2gis.com/nAWSz'
    },
    {
        category: 'nature',
        title: 'Ыбыкты',
        description: 'Небольшая, но невероятно красивая природная достопримечательность Мангистау. Живописные скальные образования всего в 60 км от Актау.',
        image: 'https://static.tildacdn.com/tild6537-6338-4932-a663-333633643033/__2025-08-07_134232.png',
        address: '60 км от Актау',
        mapLink: 'https://go.2gis.com/teHfO'
    },
    {
        category: 'nature',
        title: 'Долина Замков Айракты',
        description: 'Мистическая долина с уникальными скальными образованиями, напоминающими древние замки. Захватывающие пейзажи в 180 км от Актау.',
        image: 'https://static.tildacdn.com/tild3032-3330-4164-b362-343730386137/__2025-08-07_134355.png',
        address: '180 км от Актау',
        mapLink: 'https://go.2gis.com/myf2A'
    },
    
    // Nature - Active Recreation
    {
        category: 'nature',
        title: 'Прокат квадроциклов',
        description: 'Экстремальные покатушки на квадроциклах по живописным местам Актау. Адреналин и незабываемые впечатления гарантированы!',
        image: 'https://static.tildacdn.com/tild6531-3739-4134-a536-386432663566/DSC01366-scaled-1.jpg',
        address: '+7 708 954 14 05',
        mapLink: 'https://go.2gis.com/yLamL'
    },
    {
        category: 'nature',
        title: 'Верховая езда',
        description: 'Романтические прогулки верхом на лошадях по степным просторам. Идеальный способ насладиться природой Мангистау.',
        image: 'http://static.tildacdn.com/tild3933-6436-4762-b662-646432656238/65c5c057e905c4778494.jpg',
        address: 'КОС-2, 3/1',
        mapLink: 'https://go.2gis.com/e5qLC'
    },
    {
        category: 'nature',
        title: 'Стрельба из лука',
        description: 'Изучите древнее искусство стрельбы из лука в современном тире. Концентрация, точность и спортивный азарт в одном месте.',
        image: 'https://static.tildacdn.com/tild3034-6633-4562-a662-393964653565/__2025-08-07_144128.png',
        address: 'ЖК Комфорт 19а микрорайон, 21 +7 775 422 26 38',
        mapLink: 'https://go.2gis.com/STfnt'
    },
    {
        category: 'nature',
        title: 'Пейнтбол',
        description: 'Командные сражения в пейнтбол с друзьями и коллегами. Тактика, стратегия и максимум адреналина в безопасной обстановке.',
        image: 'https://static.tildacdn.com/tild3661-6264-4234-b539-366461616534/__2025-08-07_144450.png',
        address: 'Промышленная зона 4 +7 747 647 01 46',
        mapLink: 'https://go.2gis.com/U0wln'
    },
    {
        category: 'nature',
        title: 'Сапборд',
        description: 'Серфинг с веслом по акватории Каспийского моря. Освойте новый водный вид спорта в живописной обстановке. Яхт-клуб Бриз',
        image: 'https://static.tildacdn.com/tild3366-6464-4030-b933-316363373137/1_387_6.jpg',
        address: 'Бриз 4а микрорайон, 54 +77076896889',
        mapLink: 'https://go.2gis.com/hNlfe'
    },
    {
        category: 'nature',
        title: 'Mangystau Safari',
        description: 'Туры по Мангистау',
        image: 'https://static.tildacdn.com/tild3461-6431-4639-b431-393931363361/__2025-08-07_172322.png',
        address: '+7 700 362 60 44',
        mapLink: 'https://go.2gis.com/6vIar'
    },
    {
        category: 'nature',
        title: 'Kettik Mangystau',
        description: 'Туры по Мангистау',
        image: 'https://static.tildacdn.com/tild3466-6461-4135-b430-623133633965/__2025-08-07_172443.png',
        address: '+7 707 362 41 40',
        mapLink: 'https://go.2gis.com/OGfGO'
    },
    
    // Nature - Resorts
    {
        category: 'nature',
        title: 'Rixos Water World Aktau',
        description: '★★★★★ отель',
        image: 'https://static.tildacdn.com/tild3138-6630-4830-a139-333838656161/__2025-08-07_170803.png',
        address: 'База отдыха Теплый пляж, 34 +7 7292 217 777',
        mapLink: 'https://go.2gis.com/8CazU'
    },
    {
        category: 'nature',
        title: 'Tree of life resort',
        description: 'Аквапарк',
        image: 'https://static.tildacdn.com/tild3836-3066-4566-b639-393432616265/__2025-08-07_170931.png',
        address: 'База отдыха Теплый пляж, 52/1',
        mapLink: 'https://go.2gis.com/4vgJa'
    },
    {
        category: 'nature',
        title: 'O\'Mir Glamping',
        description: 'Этноотель',
        image: 'https://static.tildacdn.com/tild6166-6430-4938-b039-316531366339/__2025-08-07_171106.png',
        address: 'Мунайлинский район',
        mapLink: 'https://go.2gis.com/WqAbL'
    },
    {
        category: 'nature',
        title: 'Горячие источники',
        description: '(без комфортных условий)',
        image: 'https://static.tildacdn.com/tild6238-3666-4536-a335-353036643535/__2025-08-07_171201.png',
        address: '~50 км от города',
        mapLink: 'https://go.2gis.com/gxhQ1'
    },
    {
        category: 'nature',
        title: 'Tetysblu Aquapark',
        description: 'База отдыха Теплый пляж, 34/1',
        image: 'https://static.tildacdn.com/tild3163-3336-4434-b434-643037643135/__2025-08-07_171420.png',
        address: '+7 701 879 51 55',
        mapLink: 'https://go.2gis.com/RPGzy'
    },
    
    // Nature - Seaside houses & bases (from city.html)
    {
        category: 'nature',
        title: 'Caspiy house aktau',
        description: 'Базы отдыха',
        image: 'https://static.tildacdn.com/tild3038-6266-4736-a434-633432353833/__2025-08-08_131222.png',
        address: '8(705) 238 1006',
        mapLink: 'https://go.2gis.com/El09l'
    },
    {
        category: 'nature',
        title: 'Teniz zhagaluyi',
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild3339-3363-4539-a265-633239356135/__2025-08-08_131358.png',
        address: '8(776) 748 8881, 8(707) 020 9048',
        mapLink: 'https://go.2gis.com/NzVX4'
    },
    {
        category: 'nature',
        title: 'Домик у моря Ocean',
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild6332-6665-4564-a161-343538346363/__2025-08-08_131511.png',
        address: '8(700)340 2020',
        mapLink: 'https://go.2gis.com/9zWHP'
    },
    {
        category: 'nature',
        title: 'Нур',
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild3431-6635-4639-a635-653037656439/__2025-08-08_132933.png',
        address: '8(771) 497 2727',
        mapLink: 'https://go.2gis.com/sRqrR'
    },
    {
        category: 'nature',
        title: 'Аквамарин',
        description: 'Пляжный отель',
        image: 'https://static.tildacdn.com/tild6533-6335-4434-b664-346364396339/__2025-08-08_133102.png',
        address: '8(707) 649 4985',
        mapLink: 'https://go.2gis.com/ZTygt'
    },
    {
        category: 'nature',
        title: 'Dom u morya',
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild3336-3833-4530-b661-653864336537/__2025-08-08_133206.png',
        address: '8(708) 526 8813',
        mapLink: 'https://go.2gis.com/b4nnQ'
    },
    {
        category: 'nature',
        title: 'Caspian Coast',
        description: 'Базы отдыха',
        image: 'https://static.tildacdn.com/tild6565-3432-4661-a361-613436373962/__2025-08-08_133331.png',
        address: '8(778) 679 0183, 8(701) 136 5872',
        mapLink: 'https://go.2gis.com/dKweV'
    },
    {
        category: 'nature',
        title: "De'Villa Aktau",
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild3665-3330-4566-a164-646637356331/__2025-08-08_133450.png',
        address: '8(777) 120 4750',
        mapLink: 'https://go.2gis.com/5VaPA'
    },
    {
        category: 'nature',
        title: 'Caspiy Life',
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild3932-3638-4933-b165-383134616139/__2025-08-08_133559.png',
        address: '8(702)128 0686, 8(747)128 0686',
        mapLink: 'https://go.2gis.com/PllUc'
    },
    {
        category: 'nature',
        title: 'Saura Aktau Yurting',
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild6562-3865-4062-a561-616339323966/__2025-08-08_133750.png',
        address: '8(701) 376 6262',
        mapLink: 'https://go.2gis.com/lprBN'
    },
    {
        category: 'nature',
        title: 'Shahristan',
        description: 'Гостиничный комплекс',
        image: 'https://static.tildacdn.com/tild3633-3465-4161-a531-616563623334/__2025-08-08_133848.png',
        address: '8(747) 300 4447, 8(747) 900 4447',
        mapLink: 'https://go.2gis.com/XlOEU'
    },
    {
        category: 'nature',
        title: 'Sulo Bautino',
        description: 'Гостиницы',
        image: 'https://static.tildacdn.com/tild6236-3730-4865-b063-643333396437/__2025-08-08_134008.png',
        address: '8 (701) 908 3309',
        mapLink: 'https://go.2gis.com/wn5rS'
    },
    {
        category: 'nature',
        title: 'Crystal',
        description: 'База отдыха',
        image: 'https://static.tildacdn.com/tild3563-3166-4865-a335-373034386133/__2025-08-08_134058.png',
        address: '8(701) 778 8812',
        mapLink: 'https://go.2gis.com/p1pFl'
    }
];

// Pagination variables
let currentPage = 0;
const itemsPerPage = 6;
let currentFilter = 'all';
let filteredPlaces = [...allPlaces];

// Initialize places section
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('places-grid')) {
        initializePlaces();
    }
});

function initializePlaces() {
    filteredPlaces = [...allPlaces];
    currentPage = 0;
    renderPlaces();
    updateLoadMoreButton();
}

function filterPlaces(category) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    // Filter places
    currentFilter = category;
    if (category === 'all') {
        filteredPlaces = [...allPlaces];
    } else {
        filteredPlaces = allPlaces.filter(place => place.category === category);
    }
    
    // Reset pagination and render
    currentPage = 0;
    const grid = document.getElementById('places-grid');
    grid.innerHTML = '';
    renderPlaces();
    updateLoadMoreButton();
}

function renderPlaces() {
    const grid = document.getElementById('places-grid');
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const placesToShow = filteredPlaces.slice(startIndex, endIndex);
    
    placesToShow.forEach(place => {
        const placeCard = createPlaceCard(place);
        grid.appendChild(placeCard);
    });
}

function createPlaceCard(place) {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.innerHTML = `
        <div class="place-image" style="background-image: url('${place.image}');"></div>
        <div class="place-content">
            <h3 class="place-title">${place.title}</h3>
            <p class="place-description">${place.description}</p>
            <div class="place-actions">
                <span class="text-sm text-gray-500">${place.address}</span>
                <a href="${place.mapLink}" class="btn-map-location" target="_blank">
                    <div class="map-icon"></div>
                    Посмотреть на карте
                </a>
            </div>
        </div>
    `;
    return card;
}

function loadMorePlaces() {
    currentPage++;
    renderPlaces();
    updateLoadMoreButton();
    
    // Smooth scroll to newly loaded content
    setTimeout(() => {
        const newCards = document.querySelectorAll('.place-card');
        const lastVisibleCard = newCards[Math.min(currentPage * itemsPerPage - 1, newCards.length - 1)];
        if (lastVisibleCard) {
            lastVisibleCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }, 100);
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const totalShown = (currentPage + 1) * itemsPerPage;
    
    if (totalShown >= filteredPlaces.length) {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
        const remaining = filteredPlaces.length - totalShown;
        const nextBatch = Math.min(remaining, itemsPerPage);
        loadMoreBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Показать ещё ${nextBatch} мест
        `;
    }
}
