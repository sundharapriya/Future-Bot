"""add bio and avatar_url to users

Revision ID: 0004_add_profile_fields
Revises: 0002_create_users
Create Date: 2026-08-11 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0004_add_profile_fields'
down_revision = '0003_create_revoked_tokens'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('bio', sa.Text(), nullable=True))
    op.add_column('users', sa.Column('avatar_url', sa.String(length=512), nullable=True))


def downgrade():
    op.drop_column('users', 'avatar_url')
    op.drop_column('users', 'bio')
