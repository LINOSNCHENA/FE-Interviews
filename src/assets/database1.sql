-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

drop table if exists benefits;

create table
  benefits (
    id bigint primary key generated always as identity,
    namex text,
    emailx text,
    periodMonth text,
    periodYear integer,
    created date,
    updated date,
    marriage text,
    children integer,
    grosspay integer,
    paycheck integer,
    cbenefits integer,
    discounted integer,
    families jsonb
  );

insert into
  benefits (
    namex,
    emailx,
    periodMonth,
    periodYear,
    created,
    updated,
    marriage,
    children,
    grosspay,
    paycheck,
    cbenefits,
    discounted,
    families
  )
values
  (
    'Presly',
    'presly@gmail.com',
    'January',
    2024,
    current_date,
    current_date,
    'Yes',
    0,
    0,
    4000,
    0,
    5,
    to_json(
      array[
        json_build_object(
          'id',
          1,
          'namex',
          'Nikolas',
          'created',
          current_date,
          'updated',
          current_date,
          'gender',
          'Famale'
        ),
        json_build_object(
          'id',
          2,
          'namex',
          'Alfred',
          'created',
          current_date,
          'updated',
          current_date,
          'gender',
          'famale'
        ),
        json_build_object(
          'id',
          3,
          'namex',
          'Leon',
          'created',
          current_date,
          'updated',
          current_date,
          'gender',
          'Famale'
        )
      ]
    )
  );

  select * from benefits;
SELECT
  families
FROM
  benefits;