export type Dua = {
  id: string;
  title: string;
  text: string;
  repeat?: number;
  reference?: string;
};

export type DuaCategory = {
  id: string;
  name: string;
  description?: string;
  items: Dua[];
};

export const duaCategories: DuaCategory[] = [
  {
    id: "daily",
    name: "ورد اليوم",
    description: "أدعية قصيرة تعينك على دوام الذكر",
    items: [
      {
        id: "morning",
        title: "دعاء بدء اليوم",
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ وَنُورَهُ وَبَرَكَتَهُ",
      },
      {
        id: "gratitude",
        title: "دعاء الشكر",
        text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      },
    ],
  },
  {
    id: "relief",
    name: "تفريج الكرب",
    description: "للسكينة والطمأنينة في لحظات الضيق",
    items: [
      {
        id: "distress",
        title: "دعاء الهم",
        text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      },
      {
        id: "suffice",
        title: "كفايتي",
        text: "حَسْبِيَ اللَّهُ وَنِعْمَ الْوَكِيلُ",
        repeat: 7,
      },
    ],
  },
  {
    id: "family",
    name: "الأسرة",
    description: "أدعية لحفظ الأهل والأولاد",
    items: [
      {
        id: "children",
        title: "دعاء الأولاد",
        text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا",
      },
      {
        id: "home",
        title: "بركة البيت",
        text: "اللَّهُمَّ اجْعَلْ بُيُوتَنَا بُيُوتَ سَكِينَةٍ وَذِكْرٍ وَطَاعَةٍ",
      },
    ],
  },
];
