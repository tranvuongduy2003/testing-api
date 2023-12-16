const AVATARS = [
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/avatars%2Falex-suprun-ZHvM3XIOHoE-unsplash.jpg?alt=media&token=7b556e24-f64a-4039-bfb3-7ac8c7a0f8e7&_gl=1*siosbw*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA2MjguMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/avatars%2Falexander-hipp-iEEBWgY_6lA-unsplash.jpg?alt=media&token=70dba081-3db9-4c71-bf9f-19d4f4354b10&_gl=1*1hs5jvh*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA2MzcuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/avatars%2Fchristopher-campbell-rDEOVtE7vOs-unsplash.jpg?alt=media&token=f189960a-4344-41a3-aef4-5003fc928a06&_gl=1*1q0hvib*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA2NDkuMC4wLjA.',
];

const COSMETIC_IMG = [
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Famy-shamblen-xwM61TPMlYk-unsplash.jpg?alt=media&token=62e0a73f-1480-4040-82a6-5d967cefa89e&_gl=1*1v5utot*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAzODguMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Fbelle-beauty-JPvy3rrWSeM-unsplash.jpg?alt=media&token=55588795-9422-4c97-9675-48fa170ddb0d&_gl=1*psphqe*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAzOTguMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Felement5-digital-ooPx1bxmTc4-unsplash.jpg?alt=media&token=e1d76c6f-3e59-409f-9d6d-77938c2930ac&_gl=1*wjyagz*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA0MTAuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Fjazmin-quaynor-FoeIOgztCXo-unsplash.jpg?alt=media&token=3a979fd4-cac3-4958-89d2-9153c74a7ede&_gl=1*961ibv*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA0MjUuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Fneauthy-skincare-8ZKwW-2SR28-unsplash.jpg?alt=media&token=87b50b39-7592-4160-8f51-5b6975bc87f8&_gl=1*s7g6st*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA0NDUuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Fneauthy-skincare-8jg7vumdUlU-unsplash.jpg?alt=media&token=e6f02925-cd8f-49ce-9512-186cc72e1d49&_gl=1*184hr8u*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA0NjAuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Fpmv-chamara-sCFL6R7loQk-unsplash.jpg?alt=media&token=0f449e6c-1382-4cec-a439-97324c9ce0ff&_gl=1*fke467*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA0NzEuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Ftowfiqu-barbhuiya-jbjmimlaC-U-unsplash.jpg?alt=media&token=d053b836-3ade-4cc0-891e-77fb41d254d1&_gl=1*1k69d0e*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA0ODMuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Fuliana-kopanytsia-BHOv_mdf4Bo-unsplash.jpg?alt=media&token=88f0a49a-c16e-4974-b8a8-5db4d30f0602&_gl=1*opnooj*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA0OTQuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/cosmetic%2Fmichela-ampolo-7tDGb3HrITg-unsplash.jpg?alt=media&token=9a09cf3a-f501-4c74-a286-e77702d3b574&_gl=1*1nihxzp*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjA1ODIuMC4wLjA.',
];

const PERFUME_IMG = [
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Femily-wang-a5917t2ea8I-unsplash.jpg?alt=media&token=cd4328ea-e8a9-4d65-bbbe-c592a83be1ba&_gl=1*1w8tx8r*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAwNTMuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Ffernando-andrade-potCPE_Cw8A-unsplash.jpg?alt=media&token=819272dc-094e-4eac-a131-ddece7056a02&_gl=1*v86ed5*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAwNzcuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Fjeroen-den-otter-2b0JeJTEclQ-unsplash.jpg?alt=media&token=d7baf6a5-f5f0-42fd-a569-7fb74800e93c&_gl=1*3pmtqd*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAwOTEuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Fjeroen-van-roij-sLQt9PjsCcs-unsplash.jpg?alt=media&token=b055e87f-86c6-457b-a19d-235f32bc4b0c&_gl=1*1txq4eu*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAxMjkuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Flaura-chouette-2H_8WbVPRxM-unsplash.jpg?alt=media&token=5184e4da-3be9-45dc-b70d-f4319c931cc3&_gl=1*vsfhh0*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAxNDAuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Flaura-chouette-4sKdeIMiFEI-unsplash.jpg?alt=media&token=2223a194-d790-47eb-ae8c-a97234f167e3&_gl=1*1sej7qb*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAxNTYuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Flucas-mendes-CyfmSpqNMD8-unsplash.jpg?alt=media&token=9c33630b-a311-4392-b35c-7576849d85b6&_gl=1*1yhf3ss*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAxNjkuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Fsara-saleh-cpisiUDKAqE-unsplash.jpg?alt=media&token=a6e413b0-6e31-4cba-8d64-f90254be1ddd&_gl=1*1vfpxw5*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAxODMuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Fyixian-zhao-q7iZCOXGOWY-unsplash.jpg?alt=media&token=f40781fc-94a1-4fc0-95b8-4d274172f0d2&_gl=1*1y6fcbq*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAxOTUuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Fdelfina-iacub-nrkgRRskOBo-unsplash.jpg?alt=media&token=c28e5629-daa1-4ef2-a3cd-324689b9c584&_gl=1*195rhzc*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAzMTYuMC4wLjA.',
];

export { PERFUME_IMG, COSMETIC_IMG, AVATARS };
