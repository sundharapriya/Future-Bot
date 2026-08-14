"""create revoked tokens table

Revision ID: 0003_create_revoked_tokens
Revises: 0002_create_users
Create Date: 2026-01-01 00:02:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0003_create_revoked_tokens'
down_revision = '0002_create_users'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'revoked_tokens',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('jti', sa.String(length=64), nullable=False),
        sa.Column('revoked_at', sa.DateTime(), nullable=False),
    )
    op.create_index(op.f('ix_revoked_tokens_jti'), 'revoked_tokens', ['jti'], unique=True)


def downgrade():
    op.drop_index(op.f('ix_revoked_tokens_jti'), table_name='revoked_tokens')
    op.drop_table('revoked_tokens')
