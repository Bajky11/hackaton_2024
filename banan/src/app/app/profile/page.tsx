'use client';

import { Stack, Typography } from '@mui/material';
import { TableComboBox } from '@/components/buildingBlocks/dataGrid/components/TableComboBox';

export function ProfilePage() {
  return (
    <Stack pt={2} spacing={1.5}>
      <h2>
        Hele já nevím jestli tohle sem dávat nebo ne.. kdyžtak napište doskupiny
        a domluvíme se, je to zas asi dost práce a testování ale ZAJIMAVA
        FEATURE kterou nikdo mit nebude
      </h2>
      <Section
        heading="Individualization"
        description="Individualization will tailor the search results to you!"
        fontSize={24}
      />

      <Section
        heading="I manage organization"
        description="Filter for selected organization will be automatically set on all tables."
      >
        <ComboBoxWithLabel label="Organization" />
      </Section>

      <Section
        heading="I prefer to see"
        description="Filter for selected Runner Group will be automatically set on all tables."
      >
        <ComboBoxWithLabel label="Runner Group" />
      </Section>

      <Section
        heading="Order my tables using"
        description="Tables will be sorted by your selections."
      >
        <ComboBoxWithLabel label="SAS" />
        <ComboBoxWithLabel label="Prefered Organization" />
        <ComboBoxWithLabel label="Prefered Organization" />
      </Section>
    </Stack>
  );
}

export default ProfilePage;

interface SectionProps {
  heading: string;
  description: string;
  children?: React.ReactNode;
  fontSize?: number;
}

export function Section({
  heading,
  description,
  children,
  fontSize,
}: SectionProps) {
  return (
    <Stack spacing={1}>
      <Stack>
        <Typography variant="h6" {...(fontSize && { fontSize })}>
          {heading}
        </Typography>
        <Typography color="darkgray" fontSize={13}>
          {description}
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
}

interface ComboBoxWithLabelProps {
  label: string;
}

function ComboBoxWithLabel({ label }: ComboBoxWithLabelProps) {
  return (
    <TableComboBox options={[]} label={label} value={''} setValue={() => {}} />
  );
}
