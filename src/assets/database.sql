
DROP TABLE IF EXISTS benefits;

CREATE TABLE
  benefits (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    namex TEXT,
    emailx TEXT,
    periodMonth TEXT,
    periodYear INTEGER,
    created TIMESTAMP WITH TIME ZONE,
    updated TIMESTAMP WITH TIME ZONE,
    marriage TEXT,
    children INTEGER,
    grosspay INTEGER,
    paycheck INTEGER,
    cbenefits INTEGER,
    discounted INTEGER,
    families jsonb
  );

INSERT INTO
  benefits (
    id,
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
VALUES
  (
    11,
    'Presly',
    'presly@gmail.com',
    'January',
    2024,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'Yes',
    0,
    0,
    4000,
    0,
    5,
    '[{"id": 1, "namex": "Nikolas", "created": current_timestamp, "updated": current_timestamp, "gender": "Famale"}, {"id": 2, "namex": "Alfred", "created": current_timestamp, "updated": current_timestamp, "gender": "famale"}, {"id": 3, "namex": "Leon", "created": current_timestamp, "updated": current_timestamp, "gender": "Famale"}]'
  );